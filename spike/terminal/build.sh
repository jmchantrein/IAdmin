#!/usr/bin/env bash
# Builds one image and exports its root filesystem for v86 (9p, content-addressed files).
# Usage: V86_ROOT=<clone of copy/v86> build.sh <alpine|debian>
set -euo pipefail

IMAGE=$1
HERE=$(cd "$(dirname "$0")" && pwd)
OUT=$HERE/out/$IMAGE
TAG=spike-$IMAGE

mkdir -p "$OUT"
docker rm -f "$TAG" 2>/dev/null || true
if [ -f "$HERE/$IMAGE/setup.sh" ]; then
  # Provisioned by a script in a plain container. A 32-bit glibc container could not resolve
  # names with Docker's defaults on the CI runner, and `docker build` cannot lift them.
  docker run --platform linux/386 --name "$TAG" --network host --security-opt seccomp=unconfined \
    --volume "$HERE:/spike:ro" "$(cat "$HERE/$IMAGE/base")" sh "/spike/$IMAGE/setup.sh"
else
  docker build "$HERE" --file "$HERE/$IMAGE/Dockerfile" --platform linux/386 --tag "$TAG"
  docker create --platform linux/386 --name "$TAG" "$TAG"
fi
docker export "$TAG" -o "$OUT/rootfs.tar"
tar -f "$OUT/rootfs.tar" --delete .dockerenv || true

python3 "$V86_ROOT/tools/fs2json.py" --zstd --out "$OUT/fs.json" "$OUT/rootfs.tar"
rm -rf "$OUT/rootfs-flat"
mkdir -p "$OUT/rootfs-flat"
python3 "$V86_ROOT/tools/copy-to-sha256.py" --zstd "$OUT/rootfs.tar" "$OUT/rootfs-flat"
