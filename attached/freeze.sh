#!/usr/bin/env bash
# 1. writes the names and versions of all installed packages in the current environment to the requirements.txt file.
# 2. reads the requirements.txt file and installs the specified packages and versions.
if [ "$#" -eq 1 ]; then
    case "$1" in
        1)
            pip freeze > requirements.txt
            echo "packages are written in requirements.txt"
            ;;
        2)
            pip install -r requirements.txt
            echo "packages in requirements.txt installed"
            ;;
        *)
            echo "Usage: $0 {1|2}"
            ;;
    esac
else
    echo "To write installed packages of env in requirements.txt. Usage: $0 1"
    echo "To install packages of requirements.txt. Usage: $0 2"
fi
