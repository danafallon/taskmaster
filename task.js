var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SPEED_VERBS = ['Make', 'Find', 'Construct', 'Draw'];

var SUPERLATIVE_VERBS = ['Make the <sup>', 'Draw the <sup>', 'Construct the <sup>', 'Find the <sup>', 'Choreograph the <sup> dance about <adj>', 'Write the <sup> poem about <adj>'];

var ADJECTIVES = ['a tiny', 'a round', 'a soft', 'a sexy', 'an abstract', 'a threatening', 'a slow', 'a sticky', 'an unusual', 'an inspiring', 'a jazzy', 'a shy', 'a suprising', 'an evil'];

var SUPERLATIVES = ['best', 'weirdest', 'smallest', 'biggest', 'spiciest', 'loudest', 'silliest', 'most ambitious', 'creepiest', 'most whimsical', 'most surprising', 'most futuristic', 'most suggestive', 'ugliest'];

var NOUNS = ['bridge', 'animal', 'tool', 'spoon', 'pillow', 'chair', 'shoe', 'pizza', 'mirror', 'ear', 'recipe', 'soup', 'cocktail', 'thing', 'thing', 'thing', 'crown', 'magic trick', 'tooth', 'beverage', 'noise', 'toy', 'hat', 'sock', 'profession', 'parcel', 'outfit', 'sea creature', 'airplane', 'pants', 'ball', 'glove', 'vegetable', 'instrument', 'product', 'work of art', 'container'];

var TIMES = {
    '10 minutes': 600,
    '60 seconds': 60,
    '5 minutes': 300,
    '30 minutes': 1800,
    '15 minutes': 900
};

var logoEnvelopeSrc = 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Taskmaster_logo.jpg/250px-Taskmaster_logo.jpg';

var blankEnvelopeSrc = 'https://taskmaster.tv/sites/all/themes/taskmaster/images/home-letter.png';

var hostsSrc = 'https://rts.org.uk/sites/default/files/styles/9_column_landscape/public/taskmaster_0.jpg?itok=P5JpMrSO';
var gregSrc = 'https://images.immediate.co.uk/production/volatile/sites/3/2020/10/70911_S1_Ep2_Taskmaster_Generic_Greg-4ed015e.jpg?quality=90&resize=620,413;';
var thronesSrc = 'https://taskmaster.tv/sites/all/themes/taskmaster/images/alex-greg-thrones-2020.png';
var letterSrc = 'https://taskmaster.tv/sites/all/themes/taskmaster/images/home-letter.png';
var sealSrc = 'https://taskmaster.tv/sites/all/themes/taskmaster/images/letter-seal.png';

var TaskGenerator = function (_React$Component) {
    _inherits(TaskGenerator, _React$Component);

    function TaskGenerator(props) {
        _classCallCheck(this, TaskGenerator);

        var _this = _possibleConstructorReturn(this, (TaskGenerator.__proto__ || Object.getPrototypeOf(TaskGenerator)).call(this, props));

        _this.generateTask = function () {
            console.log('generating task');
            if (_this.timer) {
                clearTimeout(_this.timer);
            }
            var task = void 0,
                seconds = 0;
            var noun = _this.getRandomItem(NOUNS);
            var adj = _this.getRandomItem(ADJECTIVES);
            var fastestWins = Math.random() > 0.5;
            if (fastestWins) {
                // Mode: fastest wins
                var verb = _this.getRandomItem(SPEED_VERBS);
                task = verb + ' ' + adj + ' ' + noun + '.';
            } else {
                // Mode: superlative (e.g. make the best thing)
                var _verb = _this.getRandomItem(SUPERLATIVE_VERBS);
                var superlative = _this.getRandomItem(SUPERLATIVES);
                var time = _this.getRandomItem(Object.keys(TIMES));
                seconds = TIMES[time];
                _verb = _verb.replace(/<sup>/, superlative);
                _verb = _verb.replace(/<adj>/, adj);
                task = _verb + ' ' + noun + '. You have ' + time + '.';
            }
            _this.setState({ task: task, seconds: seconds, fastestWins: fastestWins, isClockRunning: false });
        };

        _this.addSecond = function () {
            console.log('addSecond');
            _this.setState({ seconds: _this.state.seconds + 1 });
            _this.timer = setTimeout(_this.addSecond, 1000);
        };

        _this.subtractSecond = function () {
            console.log('subtractSecond');
            var newSeconds = _this.state.seconds - 1;
            _this.setState({ seconds: newSeconds });
            if (newSeconds > 0) {
                _this.timer = setTimeout(_this.subtractSecond, 1000);
            }
        };

        _this.startTimer = function () {
            _this.setState({ isClockRunning: true });
            if (_this.state.fastestWins) {
                _this.timer = setTimeout(_this.addSecond, 1000);
            } else {
                _this.timer = setTimeout(_this.subtractSecond, 1000);
            }
        };

        _this.state = {
            task: null,
            fastestWins: null,
            isClockRunning: false,
            seconds: 0
        };
        return _this;
    }

    _createClass(TaskGenerator, [{
        key: 'getRandomItem',
        value: function getRandomItem(list) {
            return list[Math.floor(Math.random() * list.length)];
        }
    }, {
        key: 'formatTime',
        value: function formatTime(totalSeconds) {
            var min = Math.floor(totalSeconds / 60);
            var seconds = totalSeconds - min * 60;
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            return min + ':' + seconds;
        }
    }, {
        key: 'renderTaskSection',
        value: function renderTaskSection() {
            var _state = this.state,
                task = _state.task,
                fastestWins = _state.fastestWins,
                seconds = _state.seconds,
                isClockRunning = _state.isClockRunning;

            if (!task) {
                return null;
            }

            return React.createElement(
                'div',
                { 'class': 'task' },
                React.createElement(
                    'h2',
                    null,
                    task
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h2',
                        null,
                        fastestWins ? 'Fastest wins.' : 'Your time starts...'
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'timer' },
                    isClockRunning ? React.createElement(
                        'span',
                        null,
                        this.formatTime(seconds)
                    ) : React.createElement(
                        'button',
                        { onClick: this.startTimer },
                        fastestWins ? 'Start' : 'now'
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _state2 = this.state,
                task = _state2.task,
                fastestWins = _state2.fastestWins,
                time = _state2.time;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { 'class': 'header' },
                    React.createElement('img', { src: thronesSrc, 'class': 'thrones' })
                ),
                React.createElement(
                    'div',
                    { 'class': 'main' },
                    React.createElement('img', { src: letterSrc, 'class': 'letter' }),
                    React.createElement('img', { src: sealSrc, 'class': 'seal' }),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'button',
                            { onClick: this.generateTask, 'class': 'taskBtn' },
                            'Give me a task'
                        )
                    ),
                    this.renderTaskSection()
                )
            );
        }
    }]);

    return TaskGenerator;
}(React.Component);

var domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(TaskGenerator, null), domContainer);