#!/usr/bin/env bash
set -e

#########################
# The command line help #
#########################
display_help() {
  echo "Description:"
  echo
  echo "    Simple script that converts all .m4a files to .mp3 in the current directory."
  echo
  echo "Usage: $0 [option...]" >&2
  echo "   -p, --path              (Optional) The full directory path to the album."
  echo "   -h, --help              Display help"
  echo
  exit 1
}

WHITE='\033[0;97m';
B_WHITE='\033[1;97m';
GREEN='\033[0;32m';
B_GREEN='\033[1;32m';
YELLOW='\033[0;93m';
B_YELLOW='\033[1;93m';
BG_YELLOW="\033[97;43m";
CYAN='\033[0;36m'
BG_CYAN="\033[30;46m";
INVERTED="\033[7m";
L_GRAY="\033[0;37m";
NC='\033[0m';

createMp3Directory() {
    DIR="$1";
    if [ -d "$DIR/mp3" ]; then
        echo -e "${YELLOW}mp3 directory already exists! Removing contents...${NC}"
        find "$DIR/mp3" -mindepth 1 -delete
    else
        echo -e "${WHITE}Creating mp3 directory...${NC}\n"
        mkdir mp3;
    fi;
}

convertTracks() {
    DIR="$1";

    for song in "$DIR"/*.m4a
    do
        rawName="$(basename "$song" .m4a)";
        fileName="$(basename "$song")";
        echo $testName;
        echo -e "${CYAN}Converting${NC} ${L_GRAY}$fileName"${NC} ${CYAN}to${NC} ${L_GRAY}"./mp3/$rawName.mp3${NC}";
        ffmpeg -i "$song" -c:v copy -c:a libmp3lame -q:a 4 "$DIR/mp3/$rawName.mp3">/dev/null 2>&1
        echo -e "${B_GREEN}Converted!${NC}";
    done
    echo -e "${B_GREEN}Finished Converting!${NC}";
}

convertAndReplaceTracks() {
    DIR="$1";

    for song in "$DIR"/*.m4a
    do
        rawName="$(basename "$song" .m4a)";
        fileName="$(basename "$song")";
        echo $testName;
        echo -e "${CYAN}Converting${NC} ${L_GRAY}$fileName"${NC} ${CYAN}to${NC} ${L_GRAY}"$rawName.mp3${NC}";
        ffmpeg -i "$song" -c:v copy -c:a libmp3lame -q:a 4 "$DIR/$rawName.mp3">/dev/null 2>&1
        echo -e "${GREEN}Converted!${NC}";
        echo -e "${YELLOW}Removing $fileName...${NC}\n";
        rm "$song";
    done
    echo -e "${B_GREEN}Finished Converting!${NC}";
}

#########################
# Handler #
########################
if [ "$1" == "-p" ] || [ "$1" == "--path" ]; then
    DIR="$2"
    echo -e "Attempting to convert tracks in ($DIR)..."
    #createMp3Directory "$DIR"
    convertAndReplaceTracks "$DIR"
elif [ "$1" == "-h" ] || [ "$1" == "--help" ]; then
    display_help
else
    DIR=$PWD;
    echo -e "Attempting to convert tracks in current directory ($DIR)..."
    #createMp3Directory "$DIR"
    convertAndReplaceTracks "$DIR"
fi
