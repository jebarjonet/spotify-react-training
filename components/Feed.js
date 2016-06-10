import React, {Component} from "react";
import $ from "jquery";

export class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: []
        };
    }

    componentDidMount() {
        this._loadTracksFromServer();
    }

    render() {
        let tracks = this.state.tracks.map((track) => {
            return (
                <FeedItem track={track} key={track.id}/>
            );
        });
        return (
            <div>
                {tracks}
            </div>
        );
    }

    _loadTracksFromServer() {
        $.get(`${this.props.url}?${$.param(this.props.params)}`,
            {
                dataType: "json"
            },
            (data) => {
                this.setState({
                    tracks: data.tracks.items || []
                });
            }
        );
    }
}

export class FeedItem extends Component {
    render() {
        let track = this.props.track;
        return (
            <div className="block">
                <img src={track.album.images[1].url}/>
                <div className="block__right">
                    <div className="flex-column">
                        <a href={track.external_urls.spotify}><b>{track.name}</b></a>
                        <div>
                            {
                                track.artists.map((artist, index, artists) => {
                                    return (
                                        <span key={artist.id}>
                                            <a href={artist.external_urls.spotify}>{artist.name}</a>
                                            {index < artists.length - 1 ? ", " : ""}
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <span>{::this._formatTime(track.duration_ms)}</span>
                    </div>
                </div>
            </div>
        );
    }

    _formatTime(ms) {
        const minutes = Math.floor(ms / 60000),
            seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${(seconds < 10 ? "0" : "") + seconds}`;
    }
}