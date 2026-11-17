# Derived from tools/docker/alpine in copy/v86.
FROM docker.io/i386/alpine:3.21.0

ENV KERNEL=virt

RUN apk add --no-cache openrc alpine-base agetty alpine-conf linux-$KERNEL linux-firmware-none \
    bash coreutils grep sed gawk findutils less mandoc man-pages \
    bash-doc coreutils-doc grep-doc sed-doc gawk-doc findutils-doc less-doc

COPY control-agent /usr/local/bin/control-agent

RUN sed -i 's/getty 38400 tty1/agetty --autologin root tty1 linux/' /etc/inittab \
    && echo 'ttyS0::respawn:/sbin/agetty --autologin root -s ttyS0 115200 vt100' >> /etc/inittab \
    && echo 'ttyS1::respawn:/usr/local/bin/control-agent' >> /etc/inittab \
    && echo "root:" | chpasswd \
    && sed -i '/^root:/ s#:[^:]*$#:/bin/bash#' /etc/passwd

RUN setup-hostname localhost

# https://wiki.alpinelinux.org/wiki/Alpine_Linux_in_a_chroot#Preparing_init_services
RUN for i in devfs dmesg mdev hwdrivers; do rc-update add $i sysinit; done \
    && for i in hwclock modules sysctl hostname syslog bootmisc; do rc-update add $i boot; done \
    && rc-update add killprocs shutdown

# Initramfs with the 9p modules: the root filesystem is served by the emulator.
RUN mkinitfs -F "base virtio 9p" $(cat /usr/share/kernel/$KERNEL/kernel.release)
