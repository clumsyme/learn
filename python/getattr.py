class GetEverything:
    def __getattr__(self, name):
        return name
    def __getattribute__(self, name):
        """
        Any attribute getting will call this method if it exists, and __getattr__ won't be called.
        Unless explicitly call it in this method.
        But be careful:

            return self.__getattr__(self, name)

        or any other self attribute getting in this method such as

            return self.__class__, self.foo

        will come to this method and then come into an infinite recursion, unless the code is carefully coded
        to avoid it. But using the class to call it to get attribute will get rid of the recursion.

            return GetEverything.__getattribute__(self, name)

        """
        return GetEverything.__getattr__(self, name)
