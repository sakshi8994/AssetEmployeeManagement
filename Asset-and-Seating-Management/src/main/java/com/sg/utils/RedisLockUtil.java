package com.sg.utils;

import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RedisLockUtil {

	private final StringRedisTemplate redisTemplate;
	
	public boolean acquireLock(String key , String value ,long timeoutSeconds) {
		Boolean success = redisTemplate.opsForValue()
				.setIfAbsent(key, value,timeoutSeconds,TimeUnit.SECONDS);
		
		 System.out.println("LOCK TRY -> key=" + key + ", value=" + value + ", success=" + success);
		
		return Boolean.TRUE.equals(success);
	}
	
	
	public void releaseLock(String key , String value) {
		String currentValue = redisTemplate.opsForValue().get(key);
		 System.out.println("LOCK RELEASE -> key=" + key + ", owner=" + currentValue);
		
		if(value.equals(currentValue)) {
			redisTemplate.delete(key);
			 System.out.println("LOCK DELETED -> " + key);
		}
	}
	
}
