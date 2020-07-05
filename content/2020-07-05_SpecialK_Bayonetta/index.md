+++
title = "SpecialK Mod on Linux"
deta = 2020-07-05
draft = false
[taxonomies]
tags = ["mod", "specialk"]
+++

## Introduction

I have tested SpecialK Mod on Linux for [Bayonetta](https://store.steampowered.com/app/460790/Bayonetta/) and successfully unlocked FPS of this game.
In this pose, I'd like to share how I installed SpecialK Mod on steam on linux.

### Links

- [SpecialK Mod](https://github.com/Kaldaien/SpecialK/releases)
- [An Unofficial Guild to SpecialK](https://steamcommunity.com/sharedfiles/filedetails/?id=933337066) (Steam Community)

<!-- more -->

## Screenshot

{{ modal_image(id="fullscreen", path="2020-07-05_SpecialK_Bayonetta/Screenshot_full.png") }}

## Disclaimer

I have not yet tested stability and have tested only on Bayonetta.
I'm not sure if this will work on other games but anyway share how to.
If you try things written below, do it at **YOUR OWN RIST**.

## My System

* OS: Arch Linux
* Kernel: Linux 5.7.6-12-tkg-pds (fsync enabled)
* CPU: Intel Core i7-8700
* RAM: 16GB
* GPU: NVIDIA GeForce GTX 1060 6GB
* Graphic Driver: NVIDIA 440.66.17 (proprietary/vulkan dev)

## Prerequisites

1. Install `protontricks` to system wide.
    * For Arch Linux, there is [AUR Package](https://aur.archlinux.org/packages/protontricks/).

2. Install [tkg-version of proton](https://github.com/Frogging-Family/wine-tkg-git/tree/master) into Steam.

    * I used default `proton-tkg.conf` and `Proton-tkg 5.11.r11.gb6c28187`.

    * DXVK version was `v1.7`.

3. Set the game to use installed proton-tkg.

    * I'm not sure if necessary, but I disabled steam overlay for the game.

4. Launch the game once with proton-tkg and check if it work property.

5. Check if the game is 32-bit or 64-bit.

    * Go to the game directory (`~/.local/share/Steam/steamapps/common/[gama-name]` by default) and run `file [game-name].exe`.

    * Then you will see output like `Bayonetta.exe: PE32 executable (GUI) Intel 80386, for MS Windows` for 32-bit games or `NieRAutomata.exe: PE32+ executable (GUI) x86-64, for MS Windows` for 64-bit games.

Optionally, you can use [MangoHud](https://github.com/flightlessmango/MangoHud) to check FPS and frametime.
I strongly recommend to use MangoHud or DXVK HUD (dxvk's builtin hud) to check game FPS and frametime.

## Install SpecialK Mod for the Game

1. Check steam app-id for the game by `protontricks -s [game-name]`.
    * For example, in case of Bayonetta, run `protontricks -s Bayonetta` and get app-id as `460790`.

2. Install `vcrun2017` and `d3dcompiler_47` for the game prefix by `protontricks [app-id] vcrun2017 d3dcompiler_47`.
    * `d3dcompiler_47` may not need for SpecialK, but it would be necessary for the bundled ReShade.

3. Download SpecialK v0.8.66 (`SpecialK_0_8_66.7z`) from [github repo](https://github.com/Kaldaien/SpecialK/releases).
    * **NOTE**: This is not the latest version. Latest version did not work on linux at least I have tested.
    * **NOTE**: If you are using AMD GPU, v0.9 series may work.

4. Extract downloaded file and copy SpecialK64.dll and SpecialK64.pdb (for 64-bit game) or SpecialK32.dll and SpecialK32.pdb (for 32-bit game) into the game directory where `[game-name].exe` exists. The game directory is `~/.local/share/Steam/steamapps/common/[game-name]` by default.

5. Rename copied dll file to `d3d9.dll` or `d3d11.dll` depending on API used by the game.
    * For example, Bayonetta is 32-bit and using DirectX9, so copy SpecialK32 files and rename `SpecialK32.dll` to `d3d9.dll`.

6. Launch the game once. It will crash soon but necessary to auto-generate `.ini` file to configure the mod.

7. Edit `d3d9.ini` or `d3d11.ini` file created in the game directory as below:

    * Under `[NVIDIA.API]` section, set `Disable=true`.

    * Under `[Steam.Log]` section, set `Silent=true`.

    * To unlock FPS, set `RefreshRate=0` under `[Render.FrameRate]` section.

8. Run the game with FPS/Frametime watcher.

    * If you use MangoHud, set steam launch option like `mangohud %command%`.

    * If you use DXVK HUD, set steam launch option like `DXVK_HUD=full %command%`

9. Then you'll see the game is running under the unlocked FPS.

10. If frametime is not stable, or shows periodic spikes (this is shown in Bayonetta), make [dxvk config file](https://github.com/doitsujin/dxvk/wiki/Configuration) to unlock vsync on DXVK as below:

    * For DirectX9 games: `d3d9.presentInterval = 0`.

    * For DirectX11 games: `dxgi.syncInterval = 0`.

        * **WARN**: DirectX11 games are not tested by the author.

    * Below screenshot is MangoHud of Bayonetta's title scene, without any dxvk configuration. There are periodic spikes in the frametime graph:

{{ modal_image(id="without_dxvk_conf", path="2020-07-05_SpecialK_Bayonetta/Screenshot_without_dxvk_conf.png", width="40%") }}

11. Set the steam launch option to load dxvk config file like `DXVK_CONFIG_FILE=/path/to/config/file.conf %command%` and then launch the game. Hopefully the frametime issue will disappear and the game will be smoothly rendered as below screenshot (compare the frametime graph with the previous screenshot):

{{ modal_image(id="with_dxvk_conf", path="2020-07-05_SpecialK_Bayonetta/Screenshot_with_dxvk_conf.png", width="40%") }}

12. (optional) If you'd like to use ReShade, copy `PlugIns` folder in the extracted SpecialK folder into `~/.local/share/Steam/steamapps/compatdata/[app-id]/pfx/drive_c/users/steamuser/My Documents/My Mods/SpecialK/` and enable ReShade plugin from the in-game menu of SpecialK. Menu can be opened by pressing `Ctrl` + `Shift` + `Backspace`. Then check ReShade in `Plug-Ins` -> `Unofficial` and restart the game.

13. (optional) If you'd like to use newer ReShade or custom ReShade not bundled with SpecialK, replace `ReShade32.dll` or `ReShade64.dll` in the `PlugIns/Unofficial/ReShade` directory by that version.

## Issues

* SpecialK OSD shows higher FPS than DXVK HUD/MangoHud by twice on Bayonetta (see left-side bottom of the first screenshot). Maybe correct FPS is shown by MangoHud's or DXVK HUD's one.


## Uninstall

Remove or rename `d3d9.dll` or `d3d11.dll` file in the game directory.
