import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
    constructor() {
        super();
        console.log("This is my name ")
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount() {
        console.log("next");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=b4213a7bc6034d688631a36f33d957b7&page=1&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedata = await data.json()
        this.setState({ articles: parsedata.articles, totalResults: parsedata.totalResults })
    }
    handleNextClick = async () => {
        console.log("next");
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=b4213a7bc6034d688631a36f33d957b7&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedata = await data.json()
            this.setState({ loading: false });
            this.setState({
                page: this.state.page + 1,
                articles: parsedata.articles
            })
        }
    }
    handlePreviousClick = async () => {
        console.log("Previous")
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=b4213a7bc6034d688631a36f33d957b7&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedata = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: (parsedata.articles)
        })

    }
    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center">NewsMonkey- Top Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}></NewsItem>
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>

                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
