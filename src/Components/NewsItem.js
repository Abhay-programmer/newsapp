import React, { Component } from 'react'

export class NewsItem extends Component {


    render() {
        let { title, description, imageUrl, newsUrl } = this.props;
        return (
            <div className="my-3">
                <div className="card">
                    <img src={!imageUrl ? "https://img.theepochtimes.com/assets/uploads/2021/09/17/GettyImages-1340552056-1200x800.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark btn-sm">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
