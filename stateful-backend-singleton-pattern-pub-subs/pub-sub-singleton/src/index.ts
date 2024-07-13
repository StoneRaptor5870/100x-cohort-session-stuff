import { PubSubManager } from "./PubSubManager";

PubSubManager.getInstance().userSubscribe(Math.random().toString(), "APPL");

PubSubManager.getInstance().userSubscribe(Math.random().toString(), "GOOGLE");
