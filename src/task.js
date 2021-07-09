
const SPEED_VERBS = [
    'Make',
    'Find',
    'Construct',
    'Draw',
];

const SUPERLATIVE_VERBS = [
    'Make the <sup>',
    'Draw the <sup>',
    'Construct the <sup>',
    'Find the <sup>',
    'Choreograph the <sup> dance about <adj>',
    'Write the <sup> poem about <adj>',
];

const ADJECTIVES = [
    'a tiny',
    'a round',
    'a soft',
    'a sexy',
    'an abstract',
    'a threatening',
    'a slow',
    'a sticky',
    'an unusual',
    'an inspiring',
    'a jazzy',
    'a shy',
    'a suprising',
    'an evil',
];

const SUPERLATIVES = [
    'best',
    'weirdest',
    'smallest',
    'biggest',
    'spiciest',
    'loudest',
    'silliest',
    'most ambitious',
    'creepiest',
    'most whimsical',
    'most surprising',
    'most futuristic',
    'most suggestive',
    'ugliest',
];

const NOUNS = [
    'bridge',
    'animal',
    'tool',
    'spoon',
    'pillow',
    'chair',
    'shoe',
    'pizza',
    'mirror',
    'ear',
    'recipe',
    'soup',
    'cocktail',
    'thing',
    'thing',
    'thing',
    'crown',
    'magic trick',
    'tooth',
    'beverage',
    'noise',
    'toy',
    'hat',
    'sock',
    'profession',
    'parcel',
    'outfit',
    'sea creature',
    'airplane',
    'pants',
    'ball',
    'glove',
    'vegetable',
    'instrument',
    'product',
    'work of art',
    'container'
];

const TIMES = {
    '10 minutes': 600,
    '60 seconds': 60,
    '5 minutes': 300,
    '30 minutes': 1800,
    '15 minutes': 900,
};

const logoEnvelopeSrc = 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Taskmaster_logo.jpg/250px-Taskmaster_logo.jpg';

const blankEnvelopeSrc = 'https://taskmaster.tv/sites/all/themes/taskmaster/images/home-letter.png';

const hostsSrc = 'https://rts.org.uk/sites/default/files/styles/9_column_landscape/public/taskmaster_0.jpg?itok=P5JpMrSO';
const gregSrc = 'https://images.immediate.co.uk/production/volatile/sites/3/2020/10/70911_S1_Ep2_Taskmaster_Generic_Greg-4ed015e.jpg?quality=90&resize=620,413;'
const thronesSrc = 'https://taskmaster.tv/sites/all/themes/taskmaster/images/alex-greg-thrones-2020.png';
const letterSrc = 'https://taskmaster.tv/sites/all/themes/taskmaster/images/home-letter.png';
const sealSrc = 'https://taskmaster.tv/sites/all/themes/taskmaster/images/letter-seal.png';


class TaskGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: null,
            fastestWins: null,
            isClockRunning: false,
            seconds: 0
        };
    }

    getRandomItem(list) {
        return list[Math.floor(Math.random() * list.length)];
    }

    generateTask = () => {
        console.log('generating task')
        if (this.timer) {
            clearTimeout(this.timer);
        }
        let task,
            seconds = 0;
        const noun = this.getRandomItem(NOUNS);
        const adj = this.getRandomItem(ADJECTIVES);
        const fastestWins = Math.random() > 0.5;
        if (fastestWins) {
            // Mode: fastest wins
            const verb = this.getRandomItem(SPEED_VERBS);
            task = `${verb} ${adj} ${noun}.`;
        } else {
            // Mode: superlative (e.g. make the best thing)
            let verb = this.getRandomItem(SUPERLATIVE_VERBS);
            const superlative = this.getRandomItem(SUPERLATIVES);
            const time = this.getRandomItem(Object.keys(TIMES));
            seconds = TIMES[time];
            verb = verb.replace(/<sup>/, superlative);
            verb = verb.replace(/<adj>/, adj);
            task = `${verb} ${noun}. You have ${time}.`;
        }
        this.setState({task, seconds, fastestWins, isClockRunning: false});
    }

    addSecond = () => {
        console.log('addSecond');
        this.setState({seconds: this.state.seconds + 1});
        this.timer = setTimeout(this.addSecond, 1000);
    }

    subtractSecond = () => {
        console.log('subtractSecond');
        const newSeconds = this.state.seconds - 1
        this.setState({seconds: newSeconds});
        if (newSeconds > 0) {
            this.timer = setTimeout(this.subtractSecond, 1000);
        }
    }

    startTimer = () => {
        this.setState({isClockRunning: true});
        if (this.state.fastestWins) {
            this.timer = setTimeout(this.addSecond, 1000);
        } else {
            this.timer = setTimeout(this.subtractSecond, 1000);
        }
    }

    formatTime(totalSeconds) {
        const min = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds - (min * 60);
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${min}:${seconds}`;
    }

    renderTaskSection() {
        const {task, fastestWins, seconds, isClockRunning} = this.state;
        if (!task) {
            return null;
        }

        return <div class="task">
            <h2>{task}</h2>
            <div>
                <h2>
                    {fastestWins ? 'Fastest wins.' : 'Your time starts...'}
                </h2>
            </div>

            <div class="timer">
                {isClockRunning ?
                    <span>{this.formatTime(seconds)}</span> :
                    <button onClick={this.startTimer}>
                        {fastestWins ? 'Start' : 'now'}
                    </button>}
            </div>
        </div>;
    }

    render() {
        const {task, fastestWins, time} = this.state;
        return <div>
            <div class="header">
                <img src={thronesSrc} class="thrones" />
            </div>

            <div class="main">
                <img src={letterSrc} class="letter" />
                <img src={sealSrc} class="seal" />
                <div>
                    <button onClick={this.generateTask} class="taskBtn">
                        Give me a task
                    </button>
                </div>

                {this.renderTaskSection()}

            </div>
        </div>;
    }
}


let domContainer = document.querySelector('#root');
ReactDOM.render(
    <TaskGenerator />,
    domContainer
);
