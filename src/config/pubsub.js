class Pubsub{
    constructor(){
        this.subUid=0;
        this.topics={};
    }

    publish(topic,args){
        if(!this.topics[topic]){
            return false;
        }
        let subscribers=this.topics[topic],len=subscribers?subscribers.length:0;
        while(len--){
            subscribers[len].func(topic,args);
        }
        return this;
    }

    subscribe(topic,func){
        if(!this.topics[topic])
        {
            this.topics[topic]=[];
        }
        let token=(++this.subUid).toString();
        this.topics[topic].push({
            token:token,
            func:func
        });
        return token;
    }

    unsubscribe(token){
        for(let m in this.topics){
            if(this.topics[m]){
                for(let i=0,j=this.topics[m].length;i<j;i++){
                    if(this.topics[m][i].token===token){
                        this.topics[m].splice(i,1);
                        return token;
                    }
                }
            }
        }
        return this;
    }
}

window.pubsub=new Pubsub();