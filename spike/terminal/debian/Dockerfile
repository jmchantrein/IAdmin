# Derived from tools/docker/debian in copy/v86, without the graphical desktop.
FROM docker.io/i386/debian:bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive

# The slim image drops manual pages: restore them, they are part of the course.
RUN rm -f /etc/dpkg/dpkg.cfg.d/docker \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
    linux-image-686 systemd-sysv locales \
    gawk less man-db manpages \
    && apt-get install -y --reinstall --no-install-recommends bash coreutils grep sed findutils \
    && (apt-get install -y --no-install-recommends manpages-fr || echo "manpages-fr absent") \
    && rm -rf /var/lib/apt/lists/*

RUN echo "fr_FR.UTF-8 UTF-8" >> /etc/locale.gen \
    && locale-gen \
    && echo 'LANG="fr_FR.UTF-8"' > /etc/default/locale \
    && passwd -d root

COPY control-agent /usr/local/bin/control-agent

# Root logs in automatically on the serial console; the host drives ttyS1.
RUN mkdir -p /etc/systemd/system/serial-getty@ttyS0.service.d \
    && printf '%s\n' \
    '[Service]' \
    'ExecStart=' \
    'ExecStart=-/sbin/agetty --autologin root --noissue --noclear -s %I 115200,38400,9600 vt102' \
    > /etc/systemd/system/serial-getty@ttyS0.service.d/autologin.conf \
    && printf '%s\n' \
    '[Unit]' \
    'Description=Host control channel' \
    '[Service]' \
    'ExecStart=/usr/local/bin/control-agent' \
    'Restart=always' \
    '[Install]' \
    'WantedBy=multi-user.target' \
    > /etc/systemd/system/control-agent.service \
    && systemctl enable control-agent.service \
    && (systemctl disable apt-daily.timer apt-daily-upgrade.timer || true)

# 9p boot: root=host9p on the kernel command line mounts the filesystem served by v86.
RUN printf '%s\n' 9p 9pnet 9pnet_virtio virtio virtio_ring virtio_pci >> /etc/initramfs-tools/modules \
    && printf '%s\n' \
    '#!/bin/sh' \
    'case $1 in prereqs) exit 0;; esac' \
    '. /scripts/functions' \
    'if [ "${ROOT}" = "host9p" ]; then' \
    '    mkdir -p ${rootmnt}' \
    '    mount -n -t 9p -o trans=virtio,version=9p2000.L,cache=loose,rw host9p ${rootmnt}' \
    'else' \
    '    . /scripts/local' \
    'fi' \
    > /etc/initramfs-tools/scripts/boot-9p \
    && chmod +x /etc/initramfs-tools/scripts/boot-9p \
    && echo 'BOOT=boot-9p' >> /etc/initramfs-tools/initramfs.conf \
    && update-initramfs -u
