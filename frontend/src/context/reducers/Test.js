const initialState = [
    {
        id: 'picture 1',
        title: 'Shrimp and Chorizo Paella',
        author: 'R',
        date: 'September 14, 2016',
        description: 'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
        image: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGljdHVyZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
        comments: [],
        annotations: [],
      },
      {
        id: 'picture 2',
        title: 'title 2',
        author: 'Fekky',
        date: 'September 14, 2017',
        description: 'description 2',
        image: 'https://cdn.mos.cms.futurecdn.net/yL3oYd7H2FHDDXRXwjmbMf-970-80.jpg.webp',
        comments: [],
        annotations: [],
      }
];

export default (testPost = initialState, action) => {
    switch(action.type){
        case 'FETCH_ALL':
            return testPost;
        default: 
            return testPost;
    }
}