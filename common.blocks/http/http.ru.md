# http

Обертка для создания ajax запросов внутри блоков

## Обзор блока

### Модификаторы блока

####  Модификатор `strategy`

Допустимые значения: `abortable`, `concurrent`, `once`.

Модификатор `startegy` реализует стратегии поведения ajax запроса:

* [abortable](#modstrategyabortable)
* [concurrent](#modstrategyconcurrent)
* [once](#modstrategyonce)

<a name="modstrategyabortable"></a>

##### Отменяемый запрос (модификатор `strategy` в значении `abortable`)

```js
Http.abortable(myBlock).get(url).then(function (response) {
    var text = response.getText();
    
    BEMDOM.update(this.elem('somelem'), response.getText());
});
```
Если этот код вызвать дважды, предидущий запрос отмениться.

<a name="modstrategyconcurrent"></a>

##### Параллельный запрос (модификатор `strategy` в значении `concurrent`)

```js
Http.concurrent(myBlock).get(url).then(function (response) {
    var text = response.getText();
    
    BEMDOM.update(this.elem('somelem'), response.getText());
});
```

Обычные параллельные запросы

<a name="modstrategyonce"></a>

##### Запрос только один раз (модификатор `strategy` в значении `once`)

```js
Http.once(myBlock).get(url).then(function (response) {
    var text = response.getText();
    
    BEMDOM.update(this.elem('somelem'), response.getText());
});
```
Запрос произойдет единожды, его результат закешируется, при повторном вызове будет вернется заполненный промис.
