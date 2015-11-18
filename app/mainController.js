(function (angular) {

        'use strict';

        angular.module('memoryGame').controller('memoryGame.mainController', mainController);

        mainController.$inject = ['memoryGame.flow'];

        function mainController(flow) {

                var self = this;

                self.state = flow.state;
                self.startGame = flow.startGame;
                self.openCard = flow.openCard;
                self.createNewGame = flow.createNewGame;
        }


})(angular);
