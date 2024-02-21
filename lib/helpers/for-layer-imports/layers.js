const layers = {
  app: ["pages", "widgets", "features", "shared", "entities"],
  pages: ["widgets", "features", "shared", "entities"],
  widgets: ["features", "shared", "entities"],
  features: ["shared", "entities"],
  entities: ["shared", "entities"],
  shared: ["shared"],
};

module.exports = { layers };
