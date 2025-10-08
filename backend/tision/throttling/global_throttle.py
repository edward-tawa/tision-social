import time
import redis
from rest_framework.throttling import BaseThrottle, get_ident

r = redis.Redis(host='localhost', port=6379, db=0)
class CustomGlobalThrottle(BaseThrottle):
    def __init__(self):
        self.cache_key = None
        self.window = None
        self.limit  = None
        self.request_timestamps = []

    def get_cache_key(self, request):
        user = request.user

        if user and user.is_authenticated:
            return f'cache_key_{user.id}'
        else:
            return get_ident(request)
    
    def get_window(self, view):
        return getattr(view, 'throttling_window', 60), getattr(view, 'throttling_limit', 10)
    
    
    def allow_request(self, request, view):
        self.cache_key = self.get_cache_key(request)
        self.window, self.limit = self.get_window(view)

      
        retries = 5
        while retries > 0:
            try:
                with r.pipeline() as pipe:  
                   
                    # watch for changes on the cache_key
                    pipe.watch(self.cache_key)
                    timestamps = pipe.lrange(self.cache_key, 0, -1)
                    timestamps = [int(ts) for ts in timestamps]
                    self.request_timestamps = [ts for ts in timestamps if int(time.time()) - ts < self.window]
                    if len(self.request_timestamps) >= self.limit:
                        pipe.unwatch()
                        return False
                    # start transaction
                    pipe.multi()
                    pipe.lpush(self.cache_key, int(time.time()))
                    pipe.ltrim(self.cache_key, 0, self.limit-1)
                    pipe.expire(self.cache_key, self.window + 15)
                    pipe.execute()
                    return True
            except redis.WatchError:
                retries -= 1
                time.sleep(0.01)
        return False

    def wait(self):
        if not self.request_timestamps:
            return 0
        remaining_time = self.window - (int(time.time()) - self.request_timestamps[-1])
        return max(0, remaining_time)

            
        
        