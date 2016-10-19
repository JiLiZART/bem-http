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

<a name="modstrategyconcurrent"></a>

##### Параллельный запрос (модификатор `strategy` в значении `concurrent`)

<a name="modstrategyonce"></a>

##### Запрос только один раз (модификатор `strategy` в значении `once`)

```js
Http.once(myBlock).get(url).then(function (response) {
    var text = response.getText();
    
    BEMDOM.update(this.elem('somelem'), response.getText());
});
```