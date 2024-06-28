//TODO: fix this
declare module '@mdx-js/react' {
  var module: {
    mdx: any;
    MDXContext: any;
    MDXProvider: any;
  };
  export = module;
}

declare module '*.json' {
  var module: any;
  export = module;
}
