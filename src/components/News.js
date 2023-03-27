import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  constructor(){
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
    }
  }
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=5d57fe726d964b4181ac69b39fda8e80&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults})
  }
  handleprevclick = async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=5d57fe726d964b4181ac69b39fda8e80&page=${this.state.page  - 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      page:this.state.page -1,
      articles:parsedData.articles
    })
  }
  handlenextclick = async()=>{
    if(this.state.page +1>Math.ceil(this.state.totalResults/this.props.pageSize)){

    }
    else{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=5d57fe726d964b4181ac69b39fda8e80&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      page:this.state.page +1,
      articles:parsedData.articles
    })
  }
  }
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">News Monkey Top Headlines</h1>
        <div className="row">
        {this.state.articles.map((element)=>{
          return<div className="col-md-4" key={element.url}>
          <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0.88):
          ""} imageUrl={element.urlToImage} newsUrl ={element.url}/>
          </div>
        })}       
      </div>
      <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprevclick}>&larr; Previous</button>
        <button disabled={this.state.page +1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handlenextclick}>Next &rarr;</button>
      </div>
    </div>  
    )
  }
}

export default News 