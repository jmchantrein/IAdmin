#!/bin/sh
# Provisions the Debian root filesystem. Runs inside an i386/debian:bookworm-slim container
# (see build.sh). Derived from tools/docker/debian in copy/v86, without the graphical desktop.
set -eu
export DEBIAN_FRONTEND=noninteractive

# The slim image drops manual pages: restore them, they are part of the course.
rm -f /etc/dpkg/dpkg.cfg.d/docker
apt-get update
apt-get install -y --no-install-recommends \
  linux-image-686 systemd-sysv locales gawk less man-db manpages procps
apt-get install -y --reinstall --no-install-recommends bash coreutils grep sed findutils
apt-get install -y --no-install-recommends manpages-fr || echo "manpages-fr absent"
rm -rf /var/lib/apt/lists/*

echo "fr_FR.UTF-8 UTF-8" >>/etc/locale.gen
locale-gen
echo 'LANG="fr_FR.UTF-8"' >/etc/default/locale
passwd -d root

install -m 755 /spike/control-agent /usr/local/bin/control-agent

# Root logs in automatically on the serial console; the host drives ttyS1.
mkdir -p /etc/systemd/system/serial-getty@ttyS0.service.d
cat >/etc/systemd/system/serial-getty@ttyS0.service.d/autologin.conf <<'UNIT'
[Service]
ExecStart=
ExecStart=-/sbin/agetty --autologin root --noissue --noclear -s %I 115200,38400,9600 vt102
UNIT
cat >/etc/systemd/system/control-agent.service <<'UNIT'
[Unit]
Description=Host control channel
[Service]
ExecStart=/usr/local/bin/control-agent
Restart=always
[Install]
WantedBy=multi-user.target
UNIT
systemctl enable control-agent.service
systemctl disable apt-daily.timer apt-daily-upgrade.timer || true

# 9p boot: root=host9p on the kernel command line mounts the filesystem served by v86.
printf '%s\n' 9p 9pnet 9pnet_virtio virtio virtio_ring virtio_pci >>/etc/initramfs-tools/modules
cat >/etc/initramfs-tools/scripts/boot-9p <<'BOOT'
#!/bin/sh
case $1 in prereqs) exit 0 ;; esac
. /scripts/functions
if [ "${ROOT}" = "host9p" ]; then
    mkdir -p ${rootmnt}
    mount -n -t 9p -o trans=virtio,version=9p2000.L,cache=loose,rw host9p ${rootmnt}
else
    . /scripts/local
fi
BOOT
chmod +x /etc/initramfs-tools/scripts/boot-9p
echo 'BOOT=boot-9p' >>/etc/initramfs-tools/initramfs.conf
update-initramfs -u
