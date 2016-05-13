'use strict';

(function(window) {

  /** @enum {string} */
  var Types = {
    NUMBER: 'number',
    UNDEFINED: 'undefined',
    BOOL: 'boolean',
    OBJECT: 'object'
  };

  /**
   * В зависимости от условий возвращает сообщенние
   * с информацией о медиа-объекте
   *
   * @param      {(number|string|array)}  a
   * @param      {(number|array)=}        b
   * @return     {string} Message.
   */
  function getMessage(a, b) {
    var typeA = typeof a,
      typeB = typeof b;

    switch (true) {
      case typeA === Types.BOOL:
        return createGIFMessage();

      case typeA === Types.NUMBER:
        return createSVGMessage();

      case (typeA === Types.OBJECT && typeB !== Types.OBJECT):
        return createRedDotsMessage();

      case (typeA === Types.OBJECT && typeB === Types.OBJECT):
        return createArtefactsSquareMessage();

      default:
        throw new Error('function getMessage(a, b): Invalid parameters passed');
    }

    /**
     * Создание сообщение для GIF
     *
     * @return     {string}
     */
    function createGIFMessage() {
      if (a) {
        if (typeB === Types.UNDEFINED) {
          throw new Error('GIF Frames undefined');
        }
        return 'Переданное GIF-изображение анимировано и содержит ' + b + ' кадров';
      } else {
        return 'Переданное GIF-изображение не анимировано';
      }
    }
    /**
     * Создание сообщение для SVG
     *
     * @return     {string}
     */
    function createSVGMessage() {
      if (a > 0) {
        if (b > 0) {
          return 'Переданное SVG-изображение содержит ' + a + ' объектов и ' + b * 4 + ' аттрибутов';
        } else {
          throw new Error('SVG Attributes should not be equals 0');
        }
      } else {
        throw new Error('SVG Objects should not be equals 0');
      }
    }
    /**
     * Создание сообщение для PNG
     *
     * @return     {string}
     */
    function createRedDotsMessage() {
      var sum = a.reduce(function(last, next) {
        return last + next;
      });
      return 'Количество красных точек во всех строчках изображения: ' + sum;
    }
    /**
     * Создание сообщение для JPEG
     *
     * @return     {string}
     */
    function createArtefactsSquareMessage() {
      /**
       * перемноженный список
       *
       * @type       {array}
       */
      var multipliedList = a.map(function(item, index) {
        return item * b[index];
      });
      /**
       * сумма числового списка
       *
       * @type       {number}
       */
      var sum = multipliedList.reduce(function(last, next) {
        return last + next;
      });

      return 'Общая площадь артефактов сжатия: ' + sum + ' пикселей';
    }

  }
  /**
   * экспорт метода в глобальную область видимости
   */
  window.getMessage = getMessage;
}(window));
