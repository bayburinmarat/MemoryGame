(function (angular, E) {

        'use strict';

        angular.module('memoryGame').factory('memoryGame.flow', flow);

        flow.$inject = ['$timeout', '$q'];

        function flow($timeout, $q) {

                var state = {
                        action: 'CreateGame',
                        pairNumber: 10,
                        cards: [],
                        counter: 0
                };

                var matching;

                function startGame() {

                        state.cards = E.Range(0, state.pairNumber).SelectMany(function (i) { return [{ index: i }, { index: i }]; }).Shuffle().ToArray();
                        state.counter = 0;
                        state.action = 'Gaming';
                }

                function openCard(card) {

                        if (card.status || matching) return;

                        card.status = 'OPEN';

                        matching = true;
                        matchPairs().then(function () { matching = false; });
                }

                function matchPairs() {

                        var openCards = E.From(state.cards).Where(function (i) { return i.status == 'OPEN'; });

                        if (openCards.Count() != 2) return $q.when();

                        return $timeout(function () {

                                state.counter++;
                                var sameCards = openCards.First().index == openCards.Last().index;
                                openCards.ForEach(function (i) { i.status = sameCards ? 'PAIRED' : ''; });

                        }, 1000);
                }

                function createNewGame() {

                        state.pairNumber = 10;
                        state.action = 'CreateGame';
                }

                return {
                        state: state,
                        startGame: startGame,
                        openCard: openCard,
                        createNewGame: createNewGame
                }
        }

})(angular, Enumerable);
