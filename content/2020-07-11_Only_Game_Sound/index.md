+++
title = "Streaming/Recording Only Game Sound on Linux"
date = 2020-07-11
[taxonomies]
tags = ["pulseaudio", "sound"]
+++

## About

This is an English translation of [my Japanese blog post](https://miyacopl.hatenablog.com/entry/2019/06/16/182123), including some updates.


## Introduction

When streaming or recording games, for example by [OBS](https://obsproject.com/), you may be listening to BGM or connecting to VC on discord (or something similar).
In such a case, you may want to avoid BGM or VC sounds being streamed/recorded.
In this post, I'll share the way how to configure linux sound system in such a case.

The method written in this post enables the following things:

* Output game sounds to both OBS and your speaker (or headphone/headset)
* Independently change the volume of the game which OBS captures and which you hear

<!-- more -->

### System and Software in Example Setup

* OS: Arch Linux
* Game: [NieR:Automata (Steam)](https://store.steampowered.com/app/524220/NieRAutomata/)
* VC: Discord (desktop app)
* Streaming/Recording: OBS
* DAC: Luxman DA-200 (connected by coaxial cable)

## Choosing the Method

There are some methods to accomplish this:

1. Use pulseaudio to control sound output
    1. Send game sounds to a `null sink` and capture by OBS
    2. Send game sounds to a `combined sink` and capture by OBS
2. Use Jack Audio Connection Kit (`jack`) to control sound output
    1. Use `WineASIO` for wine games and send game sounds to `jack`

Though I have tried all above three methods, I recommend `1.a.` in terms of versatility and stability.
In this post, I will share this method.

## Install PulseAudio and pavucontrol

In recent distributions/desktop-environments, usually `pulseaudio` will be installed and enabled by default. If not, install it via your package manager.

`pavucontrol` is used for output control of `pulseaudio` on GUI.

```sh
sudo pacman -S pavucontrol
```

## Configure PulseAudio

In this method, we use a `null sink` virtual output.
This virtual output originally drops all input sounds, but which has `monitor` virtual output.
From `null sink`'s `monitor` output, sounds can be connected to both OBS and normal output (speaker or headphone).
In this method, we use this module/feature.

### Check Default Output Name

At first, check the name of the default output.

Run the below command in terminal:

```sh
pacmd list-sinks
```

This command shows all available outputs list.

This is an example output of mine:

```
3 sink(s) available.
  * index: 0
        name: <alsa_output.pci-0000_00_1f.3.iec958-stereo>
        driver: <module-alsa-card.c>
        flags: HARDWARE HW_MUTE_CTRL DECIBEL_VOLUME LATENCY DYNAMIC_LATENCY
        state: RUNNING

        <-- snipped -->

        properties:
                alsa.resolution_bits = "32"
                device.api = "alsa"
                device.class = "sound"
                alsa.class = "generic"
                alsa.subclass = "generic-mix"
                <-- snipped -->

<-- snipped -->
```

There should be some lines including `index: <number>`, so make a note of the desired destination name from the `name: <name>` field just below the `index` line. In my case, it should be `alsa_output.pci-0000_00_1f.3.iec958-stereo`. You can also use index number for this purpose, but this number might be changed, so avoid it and use the name field.

### Configure User's `default.pa`

`pulseaudio` has two configurations: system-wide and user-specific.
Here, I use user-specific configuration.

`pulseaudio` loads configuration from `~/.config/pulse/default.pa` if exists.
If not this file exists, make it by yourself.

Make or edit `default.pa` as below:

```sh
# First, load system-wide default setting
# The path of system-wide setting file may differ from your system, please check yours
.include /etc/pulse/default.pa

# Create a new `null-sink`
# Freely choose `sink_name` field, but as it is used in the following settings, don't forget it
load-module module-null-sink sink_name=OBSSink

# Make display name of the created `null-sink`
# The first argument must be same as the above `sink_name`
update-sink-proplist OBSSink device.description=OBSSink

# Enable and configure loopback module
# This configuration sets output of the `null-sink` to your default output
# Set `<sink_name>.monitor` to the source field (note: add `.monitor` to the null-sink name created above)
# `sink` field should be the name of your default output checked above by `pacmd` command
# `adjust_time` field should be `0` and disable it
# Set `latency_msec` field to the lowest value, `1` (200 msec latency by default)
# *Change `format` and `rate` field depending on your system*, or simply remove them
load-module module-loopback source=OBSSink.monitor sink=alsa_output.pci-0000_00_1f.3.iec958-stereo adjust_time=0 latency_msec=1 format=s24le rate=192000 channels=2
```

Then restart `pulseaudio`:

```sh
pulseaudio -k
```

Usually, by the above command, `pulseaudio` will be killed and then automatically restart, but if not restart (you can check it by opening `pavucontrol` and if it shows outputs as usual), manually restart it by the below command:

```sh
pulseaudio --start
```

Or, simply restart the PC.

If there is no misconfiguration in the config file, `pulseaudio` will start correctly.

Then check if the new `null-sink` is properly added to on `pavucontrol`.
Open `pavucontrol` and go to "Playback" tab, then you'll see "Loopback from Monitor of Null Output" is added.
If not shown, confirm that `Show:` field on the bottom is selected as `All Streams`.

Furthermore, check output of the `loopback` is set to the default output defined in the above config file.

If `pulseaudio` is configured properly, `pavucontrol`'s playback tab will look like this:

{{ modal_image(id="pavucontrol_1", path="2020-07-11_Only_Game_Sound/Screenshot_pavucontrol_1.png", width="90%") }}

## Configure the Game Output

Then launch the game.
In this post, use [NieR:Automata on Steam](https://store.steampowered.com/app/524220/NieRAutomata/) as an example.

After launching the game, you will see the new game output(s) on the Playback tab on `pavucontrol`.
Next to the game name (in this case it's "NieRAutomata.exe"), there should be a selector of the output.
Select the name of the `null sink` created in the above section (with the above example configuration, it should be `OBSSink`).
If `pulseaudio` is configured properly, you should still hear the game sound after changing the game output to the `null sink`.

{{ modal_image(id="pavucontrol_2", path="2020-07-11_Only_Game_Sound/Screenshot_pavucontrol_2.png", width="90%") }}

Additionally, it's better to confirm here that other application's outputs are **not connected** to the `null sink`.
If connected, they will be mixed into the streaming/recording.
If you are using desktop application version of discord client, make sure it's configured to use output other than the `null sink` on its own configuration window.

## Configure OBS

I skip details of the way how to capture the game on OBS since it's same as the case of Windows OS.
Simply add "Window capture" in "Sources" and select the game window.

By default, OBS captures all sounds from pulseaudio's default sink, so you need to mute this.
In "Audio Mixer", there should be "Desktop Audio" by default, click the speaker icon and mute it.

Next, configure OBS to capture the game sound.
From "Sources", add "Audio Output Capture (PulseAudio)" and select "Create New" and add it with your preferred name.
Then device selection window should open, select the name of `null sink` added in the above section (it's `OBSSink` in this example).
You'll see a new sound capture in the "Audio Mixer" with the name you added.

{{ modal_image(id="obs_mixer", path="2020-07-11_Only_Game_Sound/Screenshot_OBS_mixer.png", width="80%") }}

Now you can stream/record only the game sound.
Try to stream/record the game with any BGM or something.

## (Optional) Change the Game Volume Independently

In this method, you can change the volume of the game which you hear and which is streamed/recorded.

In my thoughts, as audience can reduce the volume but cannot increase it, it's better to stream/record with the original volume and reduce the volume you hear.

This is not difficult.
Open `pavucontrol` with the game launched, then change the volume of "Loopback from Monitor of Null Output" in the "Playback" tab.
If you want to mute the game sound you hear, simply mute this.

## Closing

This concludes the `pulseaudio`'s settings and streaming/recording sound settings of OBS.
By changing input/output of `null sink`, this can be used for various use cases not only for game streaming/recording.
Please try it.

## References

* [pulseaudio - Route application's audio output to multiple playback devices - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/458044/route-applications-audio-output-to-multiple-playback-devices)
* [PulseAudio - ArchWiki](https://wiki.archlinux.org/index.php/PulseAudio)
* [Modules - PulseAudio Documentation](https://www.freedesktop.org/wiki/Software/PulseAudio/Documentation/User/Modules/)
