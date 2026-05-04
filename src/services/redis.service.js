import { createClient } from "redis";
import { getEnv } from "../config/default";


export const getConnection = async() => {
    const redis = createClient({ url: getEnv('redisUrl')});
    await redis.connect();
    return redis;
}