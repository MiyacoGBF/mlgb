+++
title = "How to Install FAR, HD Texture Pack, and ReShade (GShade) for NieR:Automata on Linux"
slug = "nier-automata-far"
date = 2020-02-09
updated = 2020-07-05

[taxonomies]
tags = ["mod", "specialk", "nier_automata"]
+++

## About

This guide is originally posted to [my gist](https://gist.github.com/MiyacoGBF/6fd49ae4a73a9a7f4d13c488bff2da77), but to create this new blog, moved from gist to this blog as the first post.
Contents are almost same but a bit refined.
Comments are still welcome!

### Links

* [FAR (Fix (NieR) Automata Resolution)](https://github.com/Kaldaien/FAR) -- Required by HD Texture Pack.
* [HD Texture Pack](https://www.nexusmods.com/nierautomata/mods/5)
* [ReShade](https://reshade.me/)

<!-- more -->

## Screenshot

{{ modal_image(id="fullscreen", path="2020-02-09_NieR_Automata_FAR/Screenshot_full.png") }}

## Disclaimer

I have not tested stabilities of them yet.
If you want to try things written below, do it at **YOUR OWN RISK**.

## Motivations (why I want to use FAR on Linux)

* I'm using a 144Hz monitor, so I want to unlock FPS by FAR.
* I want to use HD Texture Pack for better graphics, which requires FAR.

## System

* OS: Arch Linux
* Kernel: Linux 5.5.2-11-tkg-pds (fsync enabled)
* CPU: Intel Core i7-8700
* RAM: 16GB
* GPU: NVIDIA GeForce GTX 1060 6GB
* Driver: NVIDIA 440.59
* DE: Plasma
* WM: KWin

## Prerequisites

1. Install `protontricks` to system wide (use later).

    * For Arch Linux, it can install from [AUR](https://aur.archlinux.org/packages/protontricks/).

2. Install tkg-version of proton into Steam. I used `Pronton-tkg 5.1.r9.gc26be86c`. See [Tk-Glitch's PKGBUILD repo](https://github.com/Tk-Glitch/PKGBUILDS) for details. `proton-tkg.cfg` are attached to [the original gist post](https://gist.github.com/MiyacoGBF/6fd49ae4a73a9a7f4d13c488bff2da77#file-proton-tkg-cfg).

3. On Steam client, set NieR:Automata to use proton-tkg.

4. Launch NieR:Automata.

    * If this is the first time to run NieR:Automata, Steam will automatically run Windows DirectX setup and install it to the default prefix of this game.

    * Otherwise, Steam will update the default prefix of this game for your proton-tkg.

5. Check NieR:Automata runs correctly.

Game directory for NieR:Automata is `~/.local/share/Steam/steamapps/common/NieRAutomata/` by default.

Run `protontricks -s NieR` and check that NieR:Automata's steam app ID is `524220`.

## FAR - Fix (NieR) Automata Resolution

### Install

I tried latest version of FAR (v0.7.0.23), but it was not stable and had a performance issue. Here, I use version v0.7.0.14, which is better in performance, though have a problem on GUI menu (but have a workaround as below).

1. Configure NieR:Automata as `windowed mode`, `1600x900` resolution, and `VSYNC` to `OFF`, then close the game. I'm not sure, but these setting was worked OK anyway. Disabling `VSYNC` is mandatory to uncap FPS.

2. Download FAR v0.7.0.14 (FAR_0_7_0_14.7z) from [https://github.com/Kaldaien/FAR/releases](https://github.com/Kaldaien/FAR/releases) and extract it.

3. Copy all extracted files/folders into the game directory (`~/.local/share/Steam/steamapps/common/NieRAutomata/` by default).

4. Install `vcrun2015` and `dinput8` by protontricks.

    1. Run `protontricks 524220 vcrun2015 dinput8` and install `vcrun2015` and `dinput8`.

    2. Run `protontricks 524220 winecfg` and open `winecfg`.

        1. Check windows version is set to `Windows 10`.

        2. Go to Library tab, then set `dinput8` to `Native then Builtin`.

5. Launch NieR:Automata. You will see FAR's OSD (if not seen, press `Ctrl` + `Shift` + `O`), but probably fail to open GUI menu (press `Ctrl` + `Shift` + `Backspace`, then game *crashes*).

6. Close the game. You'll see `FAR.ini` and `dinput8.ini` are generated in the game directory.

7. Edit `FAR.ini` and `dinput8.ini`. These settings uncap FPS limit in game and fix GUI menu crash (maybe).

    1. In `FAR.ini`, edit `UncapFPS=false` to `UncapFPS=true`.

    2. In `dinput8.ini`, edit as below:

        1. `LogLevel` in `SpecialK.System` section to `2` to see logs on OSD.

        2. `TargetFPS` in `Render.FrameRate` section to larger value than 60. Or set to 0 to disable FPS limitter.

        3. `Silent` in `Steam.Log` section to `true`. (workaround for fixing GUI crash, maybe)

8. Launch game again.
   Then in the SquareEnix logo scene you'll see FPS on OSD is higher than 60.
   And logs on top of the OSD will say `uncapped`.
   If you missed to see it in the logo scene (it's quite short), continue and load the save data.
   In the game (not menu), you'll also see uncapped FPS.
   If log is not shown on the OSD, disable and enable OSD again by pressing `Ctrl` + `Shift` + `O` twice.

9. Maybe you can now open GUI menu by pressing `Ctrl` + `Shift` + `Backspace` without game crashing. Tweak FAR as you like there. Do not forget to turn off debug logging (in compatibility/debug section, set log level to 0), which has performance cost.


My [FAR.ini](https://gist.github.com/MiyacoGBF/6fd49ae4a73a9a7f4d13c488bff2da77#file-far-ini) and [dinput8.ini](https://gist.github.com/MiyacoGBF/6fd49ae4a73a9a7f4d13c488bff2da77#file-dinput8-ini) are attached to the original gist post.

### Issues

* When moving mouse, the game stutters a bit.

### Uninstall

Rename or remove `dinput8.dll` in the game directory.


## HD Texture Pack

Same as Windows, no linux specific.

### Install

FAR is required to use this pack. If you still not installed FAR, install it first.

1. Download HD Texture Pack from [NexusMods](https://www.nexusmods.com/nierautomata/mods/5). You need to create account and sign-in to this site.

2. Extract the downloaded file and move `FAR_Res` folder to the NieR:Automata game directory (`~/.local/share/Steam/steamapps/common/NieRAutomata/` by default).

3. Launch the game. You will see improved graphics.


### Uninstall HD Texture Pack

Rename or remove `FAR_Res` folder in the game directory.


## ReShade (or GShade, which is a fork of ReShade)

### Install

I used GShade, so in this section I write mainly about GShade, but the procedure will be almost same for ReShade. For ReShade on Linux, [this guild](https://www.reddit.com/r/linux_gaming/comments/b2hi3g/reshade_working_in_wine_43/) would be helpful but little a bit different from my case.

1. Close NieR:Automata if it's running.

2. Download and extract GShade/ReShade.

    * For GShade, go to [https://gposers.com/gshade/](https://gposers.com/gshade/) and click `ZIP FILE` button. Then simply extract the downloaded file.

    * For ReShade, go to [https://reshade.me/](https://reshade.me/) and click `Download ReShade *.*.*` button. This link will downlaod `.exe` version, but you can simply unzip it by `unzip` command.

3. Manually install GShade/ReShade to NieR:Automata game directory.

    * For GSahde, copy all files/folders other than `d3d9.dll` into the game directory.

    * For ReShade, copy `ReShade64.json` and `ReShade64.dll` to the game directory, then rename `ReShade64.dll` to `d3d11.dll`.

4. Install `d3dcompiler_47` by protontricks.

    1. Run `protontricks 524220 d3dcompiler_47`. This command installs `d3dcompiler_47.dll` for the wine prefix.

    2. Run `protontricks 524220 winecfg`.

        1. Set Windows version to `Windows 10`.

        2. Go to Library tab, then set `d3dcompiler_47` to `Native`, press OK.

5. Launch NieR:Automata and press `Shift` + `F2` (or `Home` key for ReShade). If successfully installed, GShade or ReShade menu will be shown on the game. Tweak it as you like.

### Issues of Gshade/ReShade

* ~~I tested GShade 2.1.0 (including ReShade 4.5.3 updates) and ReShade 4.5.3, both had an issue on moving mouse. When mouse cursor is moved, the game is stuck for a couple of seconds. This issue is also shown in FFXIV (stand alone version) on my environment.~~

    * NOTE: In the case of FFXIV, it seems to be [a bug of wine-staging patch](https://bugs.winehq.org/show_bug.cgi?id=48726).
    * **UPDATE** (2020-07-05): This issue seems to be fixed on recent wine/proton (tested on `Proton-tkg 5.11.r11.gb6c28187` and i3-wm/picom).

### Uninstall GShade/ReShade

Rename or remove `d3d11.dll` file in the game directory.
