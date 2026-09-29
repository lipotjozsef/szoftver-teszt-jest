# Unit Testing with [Jest](https://jestjs.io/docs/getting-started) 101

## Jest-projekt előkészítése

Miután létrehoztuk a projekt főkönyvtárát, készítsük el a Node projektünket.

1. Futtassuk az alábbi parancsot:

   ```bash
   npm init -y
   ```

   A `-y` opcionális. Használatával a projekt alapértelmezett beállításokkal jön létre.

2. Telepítsük a Jestet és a hozzá tartozó típusdefiníciókat:

   ```bash
   npm install -D jest @types/jest
   ```

   A Jest egy JavaScript-tesztelési keretrendszer. A `@types/jest` csomag IntelliSense-nek segít.

3. Állítsuk be a `test` parancsot a projekt gyökérkönyvtárában található `package.json` fájlban:

   ```json
   {
     "scripts": {
       "test": "jest ." // vagy jest ./{tesztek könyvtárának elérési útja}
     }
   }
   ```

   A `jest .` parancs a projekt aktuális könyvtárában keresi és futtatja a teszteket.

Ezután a tesztek futtatásához használhatjuk az alábbi parancsot:

```bash
npm test
```

## Tesztek írása

### Tesztfájlok elnevezése

A tesztfájlokat `.test.js` kiterjesztéssel kell elnevezni, hogy a Jest automatikusan felismerje őket.

Példa:

```text
passwordValidator.js
passwordValidator.test.js
```

### Modulok importálása

CommonJS-modul importálása:

```javascript
const isStrongPassword = require('./isStrongPassword.js');
```

Node.js beépített moduljainál szintén használhatjuk a `require` függvényt (elhagyva a './' karaktereket):

```javascript
const path = require('path');
```

### Tesztek csoportosítása

A `describe` függvénnyel logikailag összetartozó teszteket csoportosíthatunk.

```javascript
describe('Jelszóvalidáció', () => {
  // Ide kerülnek a kapcsolódó tesztek.
});
```

### Egyszerű teszt írása

Egy konkrét tesztet a `test` vagy az `it` függvénnyel hozhatunk létre.

```javascript
describe('Jelszóvalidáció', () => {
  test('az erős jelszót elfogadja', () => {
    expect(isStrongPassword('Titkos123')).toBe(true);
  });
});
```

A `test` függvény első paramétere a teszt neve, a második pedig a tesztelendő kódot tartalmazó callback függvény.

### Paraméterezett tesztek

Ha ugyanazt a tesztet több különböző bemenettel szeretnénk lefuttatni, használhatjuk a `test.each` függvényt.

```javascript
describe('Érvénytelen jelszóértékek', () => {
  test.each([
    [null, false],
    [undefined, false],
  ])(
    '%s érték esetén %s eredményt kell visszaadnia',
    (testValue, expectedResult) => {
      expect(isStrongPassword(testValue)).toBe(expectedResult);
    }
  );
});
```

A tömb minden sora egy külön tesztesetet jelöl:

```javascript
[testValue, expectedResult]
```

### Kivételek tesztelése

Ha egy függvénynek hibát vagy kivételt kell dobnia, a `toThrow` ellenőrizhetjük.
- **!!FONTOS!! A toThrow-nak beadott szövegnek PONTOSAN kell eggyeznie, amit Errorban vissza adunk!**

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error('Nullával nem lehet osztani');
  }

  return a / b;
}

test('hibát dob, ha nullával próbálunk osztani', () => {
  expect(() => divide(10, 0)).toThrow(
    'Nullával nem lehet osztani'
  );
});
```

A függvényt egy callbackbe kell csomagolni, különben a kivétel még az `expect` kiértékelése előtt bekövetkezik.

### Ismétlödő tesztelés

A `beforeEach` metodussal biztosíthatjuk, hogy minden teszt előtt friss teszt adatokkal dolgozunk. Hisz, ahogy a neve is árulkodik, minden teszt előtt lefut.

```javascript
const { BankAccount } = require('../src/BankAccount.js')

describe('Banki fiók kivétel kezelés', () => {
    let TestAccount
    const initalBalance = 10000

    beforeEach(() => {
        TestAccount = new BankAccount(initalBalance)
    })

    ...
}

```

### Mockolás

A mockokkal lecserélhetünk egy valódi függvényt vagy modult egy teszteléshez készített változatra. Így csak azt a kódot teszteljük, amit mi írtunk.

- Más kódjáért nem vagyunk felelősek

```javascript
const sendEmail = jest.fn();

sendEmail('user@example.com', 'Sikeres regisztráció');

expect(sendEmail).toHaveBeenCalled();
expect(sendEmail).toHaveBeenCalledWith(
  'user@example.com',
  'Sikeres regisztráció'
);
```

A `jest.fn()` egy mockfüggvényt hoz létre. Segítségével ellenőrizhetjük például, hogy:

- meghívták-e a függvényt;
- hányszor hívták meg;
- milyen argumentumokkal hívták meg;
- milyen értéket adott vissza.

## Fontos finomságok

### Reguláris kifejezések

A reguláris kifejezéseket JavaScriptben perjelek közé írjuk:

```javascript
const containsCapitalLetter = /[A-Z]/;
const containsNumber = /[0-9]/;
```

Ez jelzi a JavaScript számára, hogy nem szövegről, hanem reguláris kifejezésről van szó.

A `.test()` metódussal ellenőrizhetjük, hogy egy szöveg megfelel-e a kifejezésnek:

```javascript
function isStrongPassword(password) {
  const containsCapitalLetter = /[A-Z]/;
  const containsNumber = /[0-9]/;

  if (!containsCapitalLetter.test(password)) {
    return false;
  }

  if (!containsNumber.test(password)) {
    return false;
  }

  return true;
}
```

A függvény tesztelése:

```javascript
describe('isStrongPassword', () => {
  test('igaz értéket ad vissza nagybetűt és számot tartalmazó jelszóra', () => {
    expect(isStrongPassword('Titkos123')).toBe(true);
  });

  test('hamis értéket ad vissza, ha nincs nagybetű', () => {
    expect(isStrongPassword('titkos123')).toBe(false);
  });

  test('hamis értéket ad vissza, ha nincs szám', () => {
    expect(isStrongPassword('Titkos')).toBe(false);
  });
});
```

### Gyakran használt 'matcherek'

```javascript
expect(value).toBe(expected);
expect(value).toEqual(expected);
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(array).toContain(item);
```

- A `toBe` primitív értékek, például számok, szövegek és logikai értékek összehasonlítására használható.
- A `toEqual` objektumok és tömbök tartalmi összehasonlítására alkalmas.