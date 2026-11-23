/**
 * A map of animations by reference that notifies its listeners (once per microtask) when an
 * animation is set. A typed version of the GSAP entry's map, used by the Motion entry.
 */
export class AnimationsMap<T> extends Map<unknown, T> {
  private readonly callbacks = new Set<() => void>();

  private updateQueued = false;

  public set(key: unknown, value: T): this {
    if (key === null || key === undefined) {
      throw new Error(
        'Cannot set animation with null or undefined key. Make sure the ref you pass correctly has its value set.',
      );
    }

    // skip if value is the same, mostly for optimisation
    if (value === this.get(key)) {
      return this;
    }

    const result = super.set(key, value);

    if (this.updateQueued) {
      return result;
    }

    this.updateQueued = true;

    queueMicrotask(() => {
      for (const callback of this.callbacks) {
        callback();
      }

      this.updateQueued = false;
    });

    return result;
  }

  public listen(callback: () => void): () => void {
    this.callbacks.add(callback);

    return () => {
      this.callbacks.delete(callback);
    };
  }
}
