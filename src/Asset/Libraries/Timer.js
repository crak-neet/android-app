import React from 'react';
import { fontSize, color, fontFamily } from '../../Asset/NeetStyles/fontsAndColors';
import { View, ActivityIndicator, Modal, Text } from 'react-native';

let minutes = 0;
let hours = 0;
let Time = 0;
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ms: props.ms
        }
    }
    componentWillMount() {
        this.interval = setInterval(() => {
            if ((this.state.ms) <= 0) {
                clearInterval(this.interval);
                this.forceUpdate();
                return;
            }
            this.setState({ ms: this.state.ms + 1000 });
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    format() {


        // let seconds = Math.floor(ms / 1000);
        // if (seconds === 60) {
        //     this.setState({ ms: 1000 })
        //     ++minutes;

        // }

        // if (minutes === 60) {
        //     minutes = 0;
        //     if (++hours === 12) hours = 0;
        // }

        // Time = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);


        const { ms } = this.state;

        let msecs = ms % 1000;

        if (msecs < 10) {
            msecs = `00${msecs}`;
        } else if (msecs < 100) {
            msecs = `0${msecs}`;
        }

        let seconds = Math.floor(ms / 1000);
        let minutes = Math.floor(ms / 60000);
        let hours = Math.floor(ms / 3600000);
        seconds = seconds - (minutes * 60);
        minutes = minutes - (hours * 60);

        let Time;

        if (this.props.msecs) {
            Time = `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ?
                0 : ""}${minutes}:${seconds < 10 ?
                    0 : ""}${seconds}:${msecs}`;
        } else {
            Time = `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ?
                0 : ""}${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
        }

        return `${Time}`;
    }
    render() {
        return (
            <View><Text style={{ fontSize: fontSize.Small }}>{this.format(this.state.ms)}</Text></View>
        )
    }
}
export { Timer };