/** Inserts the page number into the annotation target **/
export const extendTarget = (annotation, source, page) => {

  // Not a very robust criterion... but holds for now
  const isRelationAnnotation = Array.isArray(annotation.target);

  // Adds 'page' field to selector (unless it's a TextQuoteSelector)
  const extendSelector = selector => selector.type === 'TextQuoteSelector' ?
    selector : { ...selector, page };

  if (isRelationAnnotation) {
    // Nothing to change, just dd source
    return {
      ...annotation,
      target: annotation.target.map(t => ({
        id: t.id, source
      }))
    };
  } else {
    return Array.isArray(annotation.target.selector) ?
      {
        ...annotation,
        target: {
          source,
          selector: annotation.target.selector.map(extendSelector)
        }
      } : {
        ...annotation,
        target: {
          source,
          selector: extendSelector(annotation.target.selector)
        }
      }
  }

}

/** Splits annotations by type, text or image **/
export const splitByType = async (annotations) => {
  let text = [];
  let image = [];
  // const myPromise = annotations;
  // myPromise.then(result => {
  //   const m1 = "this is annotaitons in split by type: " + annotations;
  //   console.log(m1);
  // });


  // return new Promise((resolve, reject) => {
  //   // Perform some asynchronous operation here, and then resolve or reject the Promise
  //   // For demonstration purposes, we'll resolve it immediately
  //   const m1 = "this is annotations in split by type: " + annotations;
  //   console.log(m1);
  //   resolve();
  // });

  if (annotations) {
    await annotations.forEach(a => {
      console.log("this is the a value:: " + JSON.stringify(a, null, 2));
      if (a.target.selector) {
        const selectors = Array.isArray(a.target.selector) ?
          a.target.selector : [a.target.selector];
        console.log("this is the a target selector2312:: " + JSON.stringify(a.target.selector, null, 2));
        const hasImageSelector =
          selectors.find(s => s.type === 'FragmentSelector' || s.type === 'SvgSelector');

        if (hasImageSelector)
          image.push(a);
        else
          text.push(a);
      } else {
        // Relationship
        text.push(a);
      }
    });
  }
  console.log("this is the final text return 45: " + JSON.stringify(text, null, 2))
  return { text, image };
}