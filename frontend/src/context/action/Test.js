export const getPost = () => {
    return {
        type: 'FETCH_ALL',
    }
}

export const updateAnnotation = (id, annotation) => {
   console.log('action');
   return {
       type: 'UPDATE_POST',
       payload: {
           id: id,
           annotation: annotation,
       }
   }
}

