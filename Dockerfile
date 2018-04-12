FROM node:latest
RUN useradd -m meteor
RUN su meteor
RUN  curl https://install.meteor.com/ | sh
RUN cd ~/
RUN git clone https://github.com/blockfreight/bftx-dashboard.git
RUN cd bftx-dashboard
RUN $HOME/.meteor/meteor