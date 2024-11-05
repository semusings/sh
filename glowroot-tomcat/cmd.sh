#!/bin/bash

set -eu

work_dir="$(pwd)/build"
downloads_dir="$work_dir/downloads"

mkdir -p "$downloads_dir"

check_arg() {
    local val_arg="$1"

    for arg in "${@:2}"; do
        if [ "$arg" = "$val_arg" ]; then
            return 0 # Success: found
        fi
    done

    return 1 # Failure: not found
}

if check_arg "--download-glowroot" "$@"; then
  zip_output="$downloads_dir/glowroot.zip"
  rm -rf "$zip_output"
  curl -Lo "$zip_output" https://github.com/glowroot/glowroot/releases/download/v0.14.2/glowroot-0.14.2-dist.zip
  unzip "$zip_output" -d "$work_dir"
  echo '{
    "web": {
      "port": 4000,
      "bindAddress": "0.0.0.0",
      "contextPath": "/"
    }
  }' > "$work_dir/glowroot/admin.json"
fi