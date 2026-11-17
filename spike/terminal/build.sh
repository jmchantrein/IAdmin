#!/usr/bin/env bash
# Builds one image and exports its root filesystem for v86 (9p, content-addressed files).
# Usage: V86_ROOT=<clone of copy/v86> build.sh <alpine|debian>
set -euo pipefail

IMAGE=$1
HERE=$(cd "$(dirname "$0")" && pwd)
OUT=$HERE/out/$IMAGE
TAG=spike-$IMAGE

mkdir -p "$OUT"
docker build "$HERE" --file "$HERE/$IMAGE/Dockerfile" --platform linux/386 --tag "$TAG"
docker rm -f "$TAG" 2>/dev/null || true
docker create --platform linux/386 --name "$TAG" "$TAG"
docker export "$TAG" -o "$OUT/rootfs.tar"
tar -f "$OUT/rootfs.tar" --delete .dockerenv || true

python3 "$V86_ROOT/tools/fs2json.py" --zstd --out "$OUT/fs.json" "$OUT/rootfs.tar"
rm -rf "$OUT/rootfs-flat"
mkdir -p "$OUT/rootfs-flat"
python3 "$V86_ROOT/tools/copy-to-sha256.py" --zstd "$OUT/rootfs.tar" "$OUT/rootfs-flat"
