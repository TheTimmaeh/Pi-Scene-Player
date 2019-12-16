# Pi Scene Player
 A scene player for movie production. Made by Team Pi

# Controls
 The player is controlled by clicking specific areas:

 | Area | Function |
 | --- | --- |
 | Center | Opens the shot selection menu |
 | Top | Increase playback speed (up to 1.0x) |
 | Bottom | Decrease playback speed (down to 0.1x) |
 | Left | Play previous shot of current location |
 | Right | Play next shot of current location |

# Clips
 Clips are stored in the `/clips` directory and follow this specific name format: `%s-%L-%l-%i.mp4`

 | Flag | Description |
 | --- | --- |
 | %s | Total shot number |
 | %L | Location title |
 | %l | Location number (used for sorting) |
 | %i | Location Shot number (used for sorting) |

 Thumbnails are not implemented yet.
