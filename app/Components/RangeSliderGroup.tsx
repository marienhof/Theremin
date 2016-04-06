import * as React from 'react';
const Slider = require('rc-slider');
import { connect } from 'react-redux';

import { DEFAULTS } from '../Constants/Defaults';
import { STYLE, STYLE_CONST } from './Styles/styles';
import {SliderAction} from '../Actions/actions'
import {IGlobalState, ISlider} from '../Constants/GlobalState';

function select(state: IGlobalState): any {
	return {
		slider: state.Slider,
	};
}

@connect(select)
class RangeSliderGroup extends React.Component<any, any> {

	private sliders: any;

	constructor(props){
		super(props);
		this.sliders = DEFAULTS.Sliders;
	}

	public componentDidMount() {
		this.setSliderStyles();
	}

	public render(): React.ReactElement<{}> {
		this.setSliderStyles();
		return (
			<div style={STYLE.sliderGroup}>
				{Object.keys(this.sliders).map((sliderName: any, id: number) => {
					return (
						<div key={id} style={this.getSliderStyles()}>
							<span style={this.getWaveformTitleStyles(sliderName)}>
								{this.sliders[sliderName].transformValue(this.props.slider[sliderName])}
								{' '}
								{sliderName.toUpperCase()}
							</span>
							<Slider
								min={this.sliders[sliderName].min}
								max={this.sliders[sliderName].max}
								step={this.sliders[sliderName].step}
								value={this.props.slider[sliderName]}
								onChange={(value) => this.onSliderChange(sliderName, value)}
								tipFormatter={null}
							/>
						</div>
					)
				})}
			</div>
		);
	}

	private onSliderChange(slider: string, value: number){
		this.props.sliderChange(slider,value);
		this.props.dispatch(SliderAction(slider, value));
	}

	private getWaveformTitleStyles(slider) {
		const smlFontSize = this.props.windowWidth / 15;
		const fontSize = smlFontSize < STYLE.sliderToolTip.fontSize ? smlFontSize : STYLE.sliderToolTip.fontSize;
		return Object.assign(
			{},
			STYLE.sliderToolTip,
			this.props.smallScreen && STYLE.sliderToolTip_smallScreen,
			{
				marginLeft: this.props[slider.name],
				fontSize,
			}
		);
	}

	private getSliderStyles(){
		return Object.assign(
			{},
			STYLE.sliderContainer,
			this.props.smallScreen && STYLE.sliderContainer_smallScreen,
			{
				display: 'flex',
				flexDirection: 'row-reverse',
				alignItems: 'center',
			}
		);

	}

	private setSliderStyles() {
		const height = this.props.smallScreen ? STYLE.slider_smallScreen.height : STYLE.slider.height;
		const sliders: any = document.querySelectorAll('.rc-slider');
		for (var i = 0; i < sliders.length; i++) {
			sliders[i].style.height = `${height}px`;
			sliders[i].style.backgroundColor = STYLE_CONST.WHITE;
		}
		const sliderTracks: any = document.querySelectorAll('.rc-slider-track');
		for (var i = 0; i < sliderTracks.length; i++) {
			sliderTracks[i].style.backgroundColor = `rgba(${STYLE_CONST.GREEN_VALUES},${1-(i*0.2)})`;
			sliderTracks[i].style.height = `${height}px`;
		}
	}
}

export default RangeSliderGroup;
