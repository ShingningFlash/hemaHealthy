export default ($axios) => {
    
    console.log(location.origin);
    let httpStr = location.origin
    if(httpStr.indexOf('https://www') != -1){
        $axios.setBaseURL('https://www.hemayy360.com/')
    }
    else if(httpStr.indexOf('http://www') != -1){
        $axios.setBaseURL('http://www.hemayy360.com/') 
    }
    else if(httpStr.indexOf('https://hemayy') != -1){
        $axios.setBaseURL('https://hemayy360.com/')
    }
    else{
        $axios.setBaseURL('http://hemayy360.com/')
    }
    
   
    return {
    //   getData: () => $axios.get('/api/get_index_data'),
      // 有参数的情况
      getIndex: data => $axios.get('/api/index?size=12',data),
      getPublic: data => $axios.get('/api/public',data),
      getAbout: data => $axios.get('/api/about',data),
      getHealth: data =>$axios.get('/api/greatHealth',data),
      getJoinUs: data => $axios.get('/api/joinUs',data),
      getCases: data => $axios.get('/api/cases',data),
      getCase:(data,data2) => $axios.get(data,{data2}),
      getCasesDetail: data => $axios.get(data),
      getContact:data=>$axios.get('/api/contact',data),
      getNews:data=>$axios.get(data),
      getNewsDetail:data=>$axios.get(data),
      getCollocation:data=>$axios.get('/api/collocation',data),
      pushdata:data =>$axios.post('/api/contact/push',data),
      pushjob:data => $axios.post('/api/joinUs/push',data)
    //   getBanner: data => $axios.post('/index/banner', data),
    //   getCases: data => $axios.post('/index/cases', data),
    //   getNews: data => $axios.post('/index/news', data),
    //   getPartner: data => $axios.post('/index/partner', data),
    //   getCasesList: data => $axios.post('/getCasesList', data),
    //   getCasesDetail: data => $axios.post('/getCasesDetail', data),
    //   getProductsList: data => $axios.post('/getProductsList', data),
    //   getProductDetail: data => $axios.post('/getProductDetail', data),
    //   getNewsCatList: data => $axios.post('/getNewsCatList', data),
    //   getNewsList: data => $axios.post('/getNewsList', data), 
    //   getNewsDetail: data => $axios.post('/getNewsDetail', data),  
    //   getAbout: data => $axios.post('/getAbout', data),
    //   getContact: data => $axios.post('/getContact', data),
    //   collocation: data => $axios.post('/collocation', data),
    //   getProductsList: params => $axios.get('/getProductsList', {params})
      // ...your other api function
    }
  }
  
