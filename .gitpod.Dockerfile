FROM gitpod/workspace-full

ENV PATH /home/linuxbrew/.linuxbrew/bin:$PATH

# More information: https://www.gitpod.io/docs/config-docker/
RUN sudo rm -rf /usr/bin/hd && \
    brew install linuxsuren/linuxsuren/hd && \
    hd install cli/cli && \
    echo server: > local_config.yaml && \
    echo "  apiServer:" >> local_config.yaml && \
    echo "    url: http://ip:port" >> local_config.yaml && \
    echo "    wsUrl: ws://ip:port" >> local_config.yaml
