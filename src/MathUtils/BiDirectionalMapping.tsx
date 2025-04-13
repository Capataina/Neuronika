export class BiDirectionalMapping {
  private mapping: Map<string, Set<string>>;

  constructor(initialMapping: Record<string, string[]>) {
    this.mapping = new Map();
    this.initializeMapping(initialMapping);
  }

  private initializeMapping(initialMapping: Record<string, string[]>) {
    // First pass: add all direct mappings
    for (const [key, values] of Object.entries(initialMapping)) {
      if (!this.mapping.has(key)) {
        this.mapping.set(key, new Set());
      }
      values.forEach(value => this.mapping.get(key)!.add(value));
    }

    // Second pass: add reverse mappings
    for (const [key, values] of Object.entries(initialMapping)) {
      values.forEach(value => {
        if (!this.mapping.has(value)) {
          this.mapping.set(value, new Set());
        }
        this.mapping.get(value)!.add(key);
      });
    }
  }

  public getMappings(): Map<string, Set<string>> {
    return this.mapping;
  }

  public getRelatedWords(word: string): string[] {
    return Array.from(this.mapping.get(word) || []);
  }

  public addMapping(key: string, value: string): void {
    if (!this.mapping.has(key)) {
      this.mapping.set(key, new Set());
    }
    if (!this.mapping.has(value)) {
      this.mapping.set(value, new Set());
    }

    this.mapping.get(key)!.add(value);
    this.mapping.get(value)!.add(key);
  }

  public removeMapping(key: string, value: string): void {
    this.mapping.get(key)?.delete(value);
    this.mapping.get(value)?.delete(key);
  }

  public debug(): void {
    console.log('=== BiDirectional Mapping Debug ===');
    const sortedKeys = Array.from(this.mapping.keys()).sort();

    for (const key of sortedKeys) {
      const relatedWords = Array.from(this.mapping.get(key) || []).sort();
      console.log(`${key}: ${relatedWords.join(', ')}`);
    }
    console.log('==================================');
  }
}
