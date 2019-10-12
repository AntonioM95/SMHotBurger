FROM node

WORKDIR /app
#RUN apt-get -y update \
 #   && apt-get -y upgrade \
  #  && apt-get install -y git

COPY package*.json ./

RUN npm install

COPY . .
RUN ls -a

EXPOSE 3000

CMD ["node", "HotBurger.js"]
	
#&& cd usr/src/app/SMHotBurger




