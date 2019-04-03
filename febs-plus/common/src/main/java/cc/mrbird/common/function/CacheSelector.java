package cc.mrbird.common.function;

@FunctionalInterface
public interface CacheSelector<T> {
    T select() throws Exception;
}
