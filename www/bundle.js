/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _coerce = __webpack_require__(10);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Operator = function () {
    function Operator(options) {
        _classCallCheck(this, Operator);

        this.name = options.name;
        this.clauses = options.clauses;
    }

    _createClass(Operator, [{
        key: 'execute',
        value: function execute(context) {
            var stack = context.stack;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {

                for (var _iterator = this.clauses[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var clause = _step.value;

                    var argCount = clause.sig.length;
                    if (stack.length < argCount) {
                        continue;
                    }

                    var args = stack.slice(-argCount);
                    var match = true;

                    for (var i = 0; i < clause.sig.length; ++i) {
                        if (!(0, _coerce.canCoerce)(args[i], clause.sig[i])) {
                            match = false;
                            break;
                        }

                        args[i] = (0, _coerce.coerce)(args[i], clause.sig[i]);
                    }

                    if (match) {
                        if (argCount > 0) {
                            stack.splice(-argCount);
                        }

                        clause.body.apply(null, [context].concat(args));
                        return;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            throw new Error('could not find matching clause for ' + this.name);
        }
    }]);

    return Operator;
}();

exports.default = Operator;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var bigInt = (function (undefined) {
    "use strict";

    var BASE = 1e7,
        LOG_BASE = 7,
        MAX_INT = 9007199254740992,
        MAX_INT_ARR = smallToArray(MAX_INT),
        LOG_MAX_INT = Math.log(MAX_INT);

    function Integer(v, radix) {
        if (typeof v === "undefined") return Integer[0];
        if (typeof radix !== "undefined") return +radix === 10 ? parseValue(v) : parseBase(v, radix);
        return parseValue(v);
    }

    function BigInteger(value, sign) {
        this.value = value;
        this.sign = sign;
        this.isSmall = false;
    }
    BigInteger.prototype = Object.create(Integer.prototype);

    function SmallInteger(value) {
        this.value = value;
        this.sign = value < 0;
        this.isSmall = true;
    }
    SmallInteger.prototype = Object.create(Integer.prototype);

    function isPrecise(n) {
        return -MAX_INT < n && n < MAX_INT;
    }

    function smallToArray(n) { // For performance reasons doesn't reference BASE, need to change this function if BASE changes
        if (n < 1e7)
            return [n];
        if (n < 1e14)
            return [n % 1e7, Math.floor(n / 1e7)];
        return [n % 1e7, Math.floor(n / 1e7) % 1e7, Math.floor(n / 1e14)];
    }

    function arrayToSmall(arr) { // If BASE changes this function may need to change
        trim(arr);
        var length = arr.length;
        if (length < 4 && compareAbs(arr, MAX_INT_ARR) < 0) {
            switch (length) {
                case 0: return 0;
                case 1: return arr[0];
                case 2: return arr[0] + arr[1] * BASE;
                default: return arr[0] + (arr[1] + arr[2] * BASE) * BASE;
            }
        }
        return arr;
    }

    function trim(v) {
        var i = v.length;
        while (v[--i] === 0);
        v.length = i + 1;
    }

    function createArray(length) { // function shamelessly stolen from Yaffle's library https://github.com/Yaffle/BigInteger
        var x = new Array(length);
        var i = -1;
        while (++i < length) {
            x[i] = 0;
        }
        return x;
    }

    function truncate(n) {
        if (n > 0) return Math.floor(n);
        return Math.ceil(n);
    }

    function add(a, b) { // assumes a and b are arrays with a.length >= b.length
        var l_a = a.length,
            l_b = b.length,
            r = new Array(l_a),
            carry = 0,
            base = BASE,
            sum, i;
        for (i = 0; i < l_b; i++) {
            sum = a[i] + b[i] + carry;
            carry = sum >= base ? 1 : 0;
            r[i] = sum - carry * base;
        }
        while (i < l_a) {
            sum = a[i] + carry;
            carry = sum === base ? 1 : 0;
            r[i++] = sum - carry * base;
        }
        if (carry > 0) r.push(carry);
        return r;
    }

    function addAny(a, b) {
        if (a.length >= b.length) return add(a, b);
        return add(b, a);
    }

    function addSmall(a, carry) { // assumes a is array, carry is number with 0 <= carry < MAX_INT
        var l = a.length,
            r = new Array(l),
            base = BASE,
            sum, i;
        for (i = 0; i < l; i++) {
            sum = a[i] - base + carry;
            carry = Math.floor(sum / base);
            r[i] = sum - carry * base;
            carry += 1;
        }
        while (carry > 0) {
            r[i++] = carry % base;
            carry = Math.floor(carry / base);
        }
        return r;
    }

    BigInteger.prototype.add = function (v) {
        var n = parseValue(v);
        if (this.sign !== n.sign) {
            return this.subtract(n.negate());
        }
        var a = this.value, b = n.value;
        if (n.isSmall) {
            return new BigInteger(addSmall(a, Math.abs(b)), this.sign);
        }
        return new BigInteger(addAny(a, b), this.sign);
    };
    BigInteger.prototype.plus = BigInteger.prototype.add;

    SmallInteger.prototype.add = function (v) {
        var n = parseValue(v);
        var a = this.value;
        if (a < 0 !== n.sign) {
            return this.subtract(n.negate());
        }
        var b = n.value;
        if (n.isSmall) {
            if (isPrecise(a + b)) return new SmallInteger(a + b);
            b = smallToArray(Math.abs(b));
        }
        return new BigInteger(addSmall(b, Math.abs(a)), a < 0);
    };
    SmallInteger.prototype.plus = SmallInteger.prototype.add;

    function subtract(a, b) { // assumes a and b are arrays with a >= b
        var a_l = a.length,
            b_l = b.length,
            r = new Array(a_l),
            borrow = 0,
            base = BASE,
            i, difference;
        for (i = 0; i < b_l; i++) {
            difference = a[i] - borrow - b[i];
            if (difference < 0) {
                difference += base;
                borrow = 1;
            } else borrow = 0;
            r[i] = difference;
        }
        for (i = b_l; i < a_l; i++) {
            difference = a[i] - borrow;
            if (difference < 0) difference += base;
            else {
                r[i++] = difference;
                break;
            }
            r[i] = difference;
        }
        for (; i < a_l; i++) {
            r[i] = a[i];
        }
        trim(r);
        return r;
    }

    function subtractAny(a, b, sign) {
        var value;
        if (compareAbs(a, b) >= 0) {
            value = subtract(a,b);
        } else {
            value = subtract(b, a);
            sign = !sign;
        }
        value = arrayToSmall(value);
        if (typeof value === "number") {
            if (sign) value = -value;
            return new SmallInteger(value);
        }
        return new BigInteger(value, sign);
    }

    function subtractSmall(a, b, sign) { // assumes a is array, b is number with 0 <= b < MAX_INT
        var l = a.length,
            r = new Array(l),
            carry = -b,
            base = BASE,
            i, difference;
        for (i = 0; i < l; i++) {
            difference = a[i] + carry;
            carry = Math.floor(difference / base);
            difference %= base;
            r[i] = difference < 0 ? difference + base : difference;
        }
        r = arrayToSmall(r);
        if (typeof r === "number") {
            if (sign) r = -r;
            return new SmallInteger(r);
        } return new BigInteger(r, sign);
    }

    BigInteger.prototype.subtract = function (v) {
        var n = parseValue(v);
        if (this.sign !== n.sign) {
            return this.add(n.negate());
        }
        var a = this.value, b = n.value;
        if (n.isSmall)
            return subtractSmall(a, Math.abs(b), this.sign);
        return subtractAny(a, b, this.sign);
    };
    BigInteger.prototype.minus = BigInteger.prototype.subtract;

    SmallInteger.prototype.subtract = function (v) {
        var n = parseValue(v);
        var a = this.value;
        if (a < 0 !== n.sign) {
            return this.add(n.negate());
        }
        var b = n.value;
        if (n.isSmall) {
            return new SmallInteger(a - b);
        }
        return subtractSmall(b, Math.abs(a), a >= 0);
    };
    SmallInteger.prototype.minus = SmallInteger.prototype.subtract;

    BigInteger.prototype.negate = function () {
        return new BigInteger(this.value, !this.sign);
    };
    SmallInteger.prototype.negate = function () {
        var sign = this.sign;
        var small = new SmallInteger(-this.value);
        small.sign = !sign;
        return small;
    };

    BigInteger.prototype.abs = function () {
        return new BigInteger(this.value, false);
    };
    SmallInteger.prototype.abs = function () {
        return new SmallInteger(Math.abs(this.value));
    };

    function multiplyLong(a, b) {
        var a_l = a.length,
            b_l = b.length,
            l = a_l + b_l,
            r = createArray(l),
            base = BASE,
            product, carry, i, a_i, b_j;
        for (i = 0; i < a_l; ++i) {
            a_i = a[i];
            for (var j = 0; j < b_l; ++j) {
                b_j = b[j];
                product = a_i * b_j + r[i + j];
                carry = Math.floor(product / base);
                r[i + j] = product - carry * base;
                r[i + j + 1] += carry;
            }
        }
        trim(r);
        return r;
    }

    function multiplySmall(a, b) { // assumes a is array, b is number with |b| < BASE
        var l = a.length,
            r = new Array(l),
            base = BASE,
            carry = 0,
            product, i;
        for (i = 0; i < l; i++) {
            product = a[i] * b + carry;
            carry = Math.floor(product / base);
            r[i] = product - carry * base;
        }
        while (carry > 0) {
            r[i++] = carry % base;
            carry = Math.floor(carry / base);
        }
        return r;
    }

    function shiftLeft(x, n) {
        var r = [];
        while (n-- > 0) r.push(0);
        return r.concat(x);
    }

    function multiplyKaratsuba(x, y) {
        var n = Math.max(x.length, y.length);

        if (n <= 30) return multiplyLong(x, y);
        n = Math.ceil(n / 2);

        var b = x.slice(n),
            a = x.slice(0, n),
            d = y.slice(n),
            c = y.slice(0, n);

        var ac = multiplyKaratsuba(a, c),
            bd = multiplyKaratsuba(b, d),
            abcd = multiplyKaratsuba(addAny(a, b), addAny(c, d));

        var product = addAny(addAny(ac, shiftLeft(subtract(subtract(abcd, ac), bd), n)), shiftLeft(bd, 2 * n));
        trim(product);
        return product;
    }

    // The following function is derived from a surface fit of a graph plotting the performance difference
    // between long multiplication and karatsuba multiplication versus the lengths of the two arrays.
    function useKaratsuba(l1, l2) {
        return -0.012 * l1 - 0.012 * l2 + 0.000015 * l1 * l2 > 0;
    }

    BigInteger.prototype.multiply = function (v) {
        var n = parseValue(v),
            a = this.value, b = n.value,
            sign = this.sign !== n.sign,
            abs;
        if (n.isSmall) {
            if (b === 0) return Integer[0];
            if (b === 1) return this;
            if (b === -1) return this.negate();
            abs = Math.abs(b);
            if (abs < BASE) {
                return new BigInteger(multiplySmall(a, abs), sign);
            }
            b = smallToArray(abs);
        }
        if (useKaratsuba(a.length, b.length)) // Karatsuba is only faster for certain array sizes
            return new BigInteger(multiplyKaratsuba(a, b), sign);
        return new BigInteger(multiplyLong(a, b), sign);
    };

    BigInteger.prototype.times = BigInteger.prototype.multiply;

    function multiplySmallAndArray(a, b, sign) { // a >= 0
        if (a < BASE) {
            return new BigInteger(multiplySmall(b, a), sign);
        }
        return new BigInteger(multiplyLong(b, smallToArray(a)), sign);
    }
    SmallInteger.prototype._multiplyBySmall = function (a) {
            if (isPrecise(a.value * this.value)) {
                return new SmallInteger(a.value * this.value);
            }
            return multiplySmallAndArray(Math.abs(a.value), smallToArray(Math.abs(this.value)), this.sign !== a.sign);
    };
    BigInteger.prototype._multiplyBySmall = function (a) {
            if (a.value === 0) return Integer[0];
            if (a.value === 1) return this;
            if (a.value === -1) return this.negate();
            return multiplySmallAndArray(Math.abs(a.value), this.value, this.sign !== a.sign);
    };
    SmallInteger.prototype.multiply = function (v) {
        return parseValue(v)._multiplyBySmall(this);
    };
    SmallInteger.prototype.times = SmallInteger.prototype.multiply;

    function square(a) {
        var l = a.length,
            r = createArray(l + l),
            base = BASE,
            product, carry, i, a_i, a_j;
        for (i = 0; i < l; i++) {
            a_i = a[i];
            for (var j = 0; j < l; j++) {
                a_j = a[j];
                product = a_i * a_j + r[i + j];
                carry = Math.floor(product / base);
                r[i + j] = product - carry * base;
                r[i + j + 1] += carry;
            }
        }
        trim(r);
        return r;
    }

    BigInteger.prototype.square = function () {
        return new BigInteger(square(this.value), false);
    };

    SmallInteger.prototype.square = function () {
        var value = this.value * this.value;
        if (isPrecise(value)) return new SmallInteger(value);
        return new BigInteger(square(smallToArray(Math.abs(this.value))), false);
    };

    function divMod1(a, b) { // Left over from previous version. Performs faster than divMod2 on smaller input sizes.
        var a_l = a.length,
            b_l = b.length,
            base = BASE,
            result = createArray(b.length),
            divisorMostSignificantDigit = b[b_l - 1],
            // normalization
            lambda = Math.ceil(base / (2 * divisorMostSignificantDigit)),
            remainder = multiplySmall(a, lambda),
            divisor = multiplySmall(b, lambda),
            quotientDigit, shift, carry, borrow, i, l, q;
        if (remainder.length <= a_l) remainder.push(0);
        divisor.push(0);
        divisorMostSignificantDigit = divisor[b_l - 1];
        for (shift = a_l - b_l; shift >= 0; shift--) {
            quotientDigit = base - 1;
            if (remainder[shift + b_l] !== divisorMostSignificantDigit) {
              quotientDigit = Math.floor((remainder[shift + b_l] * base + remainder[shift + b_l - 1]) / divisorMostSignificantDigit);
            }
            // quotientDigit <= base - 1
            carry = 0;
            borrow = 0;
            l = divisor.length;
            for (i = 0; i < l; i++) {
                carry += quotientDigit * divisor[i];
                q = Math.floor(carry / base);
                borrow += remainder[shift + i] - (carry - q * base);
                carry = q;
                if (borrow < 0) {
                    remainder[shift + i] = borrow + base;
                    borrow = -1;
                } else {
                    remainder[shift + i] = borrow;
                    borrow = 0;
                }
            }
            while (borrow !== 0) {
                quotientDigit -= 1;
                carry = 0;
                for (i = 0; i < l; i++) {
                    carry += remainder[shift + i] - base + divisor[i];
                    if (carry < 0) {
                        remainder[shift + i] = carry + base;
                        carry = 0;
                    } else {
                        remainder[shift + i] = carry;
                        carry = 1;
                    }
                }
                borrow += carry;
            }
            result[shift] = quotientDigit;
        }
        // denormalization
        remainder = divModSmall(remainder, lambda)[0];
        return [arrayToSmall(result), arrayToSmall(remainder)];
    }

    function divMod2(a, b) { // Implementation idea shamelessly stolen from Silent Matt's library http://silentmatt.com/biginteger/
        // Performs faster than divMod1 on larger input sizes.
        var a_l = a.length,
            b_l = b.length,
            result = [],
            part = [],
            base = BASE,
            guess, xlen, highx, highy, check;
        while (a_l) {
            part.unshift(a[--a_l]);
            trim(part);
            if (compareAbs(part, b) < 0) {
                result.push(0);
                continue;
            }
            xlen = part.length;
            highx = part[xlen - 1] * base + part[xlen - 2];
            highy = b[b_l - 1] * base + b[b_l - 2];
            if (xlen > b_l) {
                highx = (highx + 1) * base;
            }
            guess = Math.ceil(highx / highy);
            do {
                check = multiplySmall(b, guess);
                if (compareAbs(check, part) <= 0) break;
                guess--;
            } while (guess);
            result.push(guess);
            part = subtract(part, check);
        }
        result.reverse();
        return [arrayToSmall(result), arrayToSmall(part)];
    }

    function divModSmall(value, lambda) {
        var length = value.length,
            quotient = createArray(length),
            base = BASE,
            i, q, remainder, divisor;
        remainder = 0;
        for (i = length - 1; i >= 0; --i) {
            divisor = remainder * base + value[i];
            q = truncate(divisor / lambda);
            remainder = divisor - q * lambda;
            quotient[i] = q | 0;
        }
        return [quotient, remainder | 0];
    }

    function divModAny(self, v) {
        var value, n = parseValue(v);
        var a = self.value, b = n.value;
        var quotient;
        if (b === 0) throw new Error("Cannot divide by zero");
        if (self.isSmall) {
            if (n.isSmall) {
                return [new SmallInteger(truncate(a / b)), new SmallInteger(a % b)];
            }
            return [Integer[0], self];
        }
        if (n.isSmall) {
            if (b === 1) return [self, Integer[0]];
            if (b == -1) return [self.negate(), Integer[0]];
            var abs = Math.abs(b);
            if (abs < BASE) {
                value = divModSmall(a, abs);
                quotient = arrayToSmall(value[0]);
                var remainder = value[1];
                if (self.sign) remainder = -remainder;
                if (typeof quotient === "number") {
                    if (self.sign !== n.sign) quotient = -quotient;
                    return [new SmallInteger(quotient), new SmallInteger(remainder)];
                }
                return [new BigInteger(quotient, self.sign !== n.sign), new SmallInteger(remainder)];
            }
            b = smallToArray(abs);
        }
        var comparison = compareAbs(a, b);
        if (comparison === -1) return [Integer[0], self];
        if (comparison === 0) return [Integer[self.sign === n.sign ? 1 : -1], Integer[0]];

        // divMod1 is faster on smaller input sizes
        if (a.length + b.length <= 200)
            value = divMod1(a, b);
        else value = divMod2(a, b);

        quotient = value[0];
        var qSign = self.sign !== n.sign,
            mod = value[1],
            mSign = self.sign;
        if (typeof quotient === "number") {
            if (qSign) quotient = -quotient;
            quotient = new SmallInteger(quotient);
        } else quotient = new BigInteger(quotient, qSign);
        if (typeof mod === "number") {
            if (mSign) mod = -mod;
            mod = new SmallInteger(mod);
        } else mod = new BigInteger(mod, mSign);
        return [quotient, mod];
    }

    BigInteger.prototype.divmod = function (v) {
        var result = divModAny(this, v);
        return {
            quotient: result[0],
            remainder: result[1]
        };
    };
    SmallInteger.prototype.divmod = BigInteger.prototype.divmod;

    BigInteger.prototype.divide = function (v) {
        return divModAny(this, v)[0];
    };
    SmallInteger.prototype.over = SmallInteger.prototype.divide = BigInteger.prototype.over = BigInteger.prototype.divide;

    BigInteger.prototype.mod = function (v) {
        return divModAny(this, v)[1];
    };
    SmallInteger.prototype.remainder = SmallInteger.prototype.mod = BigInteger.prototype.remainder = BigInteger.prototype.mod;

    BigInteger.prototype.pow = function (v) {
        var n = parseValue(v),
            a = this.value,
            b = n.value,
            value, x, y;
        if (b === 0) return Integer[1];
        if (a === 0) return Integer[0];
        if (a === 1) return Integer[1];
        if (a === -1) return n.isEven() ? Integer[1] : Integer[-1];
        if (n.sign) {
            return Integer[0];
        }
        if (!n.isSmall) throw new Error("The exponent " + n.toString() + " is too large.");
        if (this.isSmall) {
            if (isPrecise(value = Math.pow(a, b)))
                return new SmallInteger(truncate(value));
        }
        x = this;
        y = Integer[1];
        while (true) {
            if (b & 1 === 1) {
                y = y.times(x);
                --b;
            }
            if (b === 0) break;
            b /= 2;
            x = x.square();
        }
        return y;
    };
    SmallInteger.prototype.pow = BigInteger.prototype.pow;

    BigInteger.prototype.modPow = function (exp, mod) {
        exp = parseValue(exp);
        mod = parseValue(mod);
        if (mod.isZero()) throw new Error("Cannot take modPow with modulus 0");
        var r = Integer[1],
            base = this.mod(mod);
        while (exp.isPositive()) {
            if (base.isZero()) return Integer[0];
            if (exp.isOdd()) r = r.multiply(base).mod(mod);
            exp = exp.divide(2);
            base = base.square().mod(mod);
        }
        return r;
    };
    SmallInteger.prototype.modPow = BigInteger.prototype.modPow;

    function compareAbs(a, b) {
        if (a.length !== b.length) {
            return a.length > b.length ? 1 : -1;
        }
        for (var i = a.length - 1; i >= 0; i--) {
            if (a[i] !== b[i]) return a[i] > b[i] ? 1 : -1;
        }
        return 0;
    }

    BigInteger.prototype.compareAbs = function (v) {
        var n = parseValue(v),
            a = this.value,
            b = n.value;
        if (n.isSmall) return 1;
        return compareAbs(a, b);
    };
    SmallInteger.prototype.compareAbs = function (v) {
        var n = parseValue(v),
            a = Math.abs(this.value),
            b = n.value;
        if (n.isSmall) {
            b = Math.abs(b);
            return a === b ? 0 : a > b ? 1 : -1;
        }
        return -1;
    };

    BigInteger.prototype.compare = function (v) {
        // See discussion about comparison with Infinity:
        // https://github.com/peterolson/BigInteger.js/issues/61
        if (v === Infinity) {
            return -1;
        }
        if (v === -Infinity) {
            return 1;
        }

        var n = parseValue(v),
            a = this.value,
            b = n.value;
        if (this.sign !== n.sign) {
            return n.sign ? 1 : -1;
        }
        if (n.isSmall) {
            return this.sign ? -1 : 1;
        }
        return compareAbs(a, b) * (this.sign ? -1 : 1);
    };
    BigInteger.prototype.compareTo = BigInteger.prototype.compare;

    SmallInteger.prototype.compare = function (v) {
        if (v === Infinity) {
            return -1;
        }
        if (v === -Infinity) {
            return 1;
        }

        var n = parseValue(v),
            a = this.value,
            b = n.value;
        if (n.isSmall) {
            return a == b ? 0 : a > b ? 1 : -1;
        }
        if (a < 0 !== n.sign) {
            return a < 0 ? -1 : 1;
        }
        return a < 0 ? 1 : -1;
    };
    SmallInteger.prototype.compareTo = SmallInteger.prototype.compare;

    BigInteger.prototype.equals = function (v) {
        return this.compare(v) === 0;
    };
    SmallInteger.prototype.eq = SmallInteger.prototype.equals = BigInteger.prototype.eq = BigInteger.prototype.equals;

    BigInteger.prototype.notEquals = function (v) {
        return this.compare(v) !== 0;
    };
    SmallInteger.prototype.neq = SmallInteger.prototype.notEquals = BigInteger.prototype.neq = BigInteger.prototype.notEquals;

    BigInteger.prototype.greater = function (v) {
        return this.compare(v) > 0;
    };
    SmallInteger.prototype.gt = SmallInteger.prototype.greater = BigInteger.prototype.gt = BigInteger.prototype.greater;

    BigInteger.prototype.lesser = function (v) {
        return this.compare(v) < 0;
    };
    SmallInteger.prototype.lt = SmallInteger.prototype.lesser = BigInteger.prototype.lt = BigInteger.prototype.lesser;

    BigInteger.prototype.greaterOrEquals = function (v) {
        return this.compare(v) >= 0;
    };
    SmallInteger.prototype.geq = SmallInteger.prototype.greaterOrEquals = BigInteger.prototype.geq = BigInteger.prototype.greaterOrEquals;

    BigInteger.prototype.lesserOrEquals = function (v) {
        return this.compare(v) <= 0;
    };
    SmallInteger.prototype.leq = SmallInteger.prototype.lesserOrEquals = BigInteger.prototype.leq = BigInteger.prototype.lesserOrEquals;

    BigInteger.prototype.isEven = function () {
        return (this.value[0] & 1) === 0;
    };
    SmallInteger.prototype.isEven = function () {
        return (this.value & 1) === 0;
    };

    BigInteger.prototype.isOdd = function () {
        return (this.value[0] & 1) === 1;
    };
    SmallInteger.prototype.isOdd = function () {
        return (this.value & 1) === 1;
    };

    BigInteger.prototype.isPositive = function () {
        return !this.sign;
    };
    SmallInteger.prototype.isPositive = function () {
        return this.value > 0;
    };

    BigInteger.prototype.isNegative = function () {
        return this.sign;
    };
    SmallInteger.prototype.isNegative = function () {
        return this.value < 0;
    };

    BigInteger.prototype.isUnit = function () {
        return false;
    };
    SmallInteger.prototype.isUnit = function () {
        return Math.abs(this.value) === 1;
    };

    BigInteger.prototype.isZero = function () {
        return false;
    };
    SmallInteger.prototype.isZero = function () {
        return this.value === 0;
    };
    BigInteger.prototype.isDivisibleBy = function (v) {
        var n = parseValue(v);
        var value = n.value;
        if (value === 0) return false;
        if (value === 1) return true;
        if (value === 2) return this.isEven();
        return this.mod(n).equals(Integer[0]);
    };
    SmallInteger.prototype.isDivisibleBy = BigInteger.prototype.isDivisibleBy;

    function isBasicPrime(v) {
        var n = v.abs();
        if (n.isUnit()) return false;
        if (n.equals(2) || n.equals(3) || n.equals(5)) return true;
        if (n.isEven() || n.isDivisibleBy(3) || n.isDivisibleBy(5)) return false;
        if (n.lesser(25)) return true;
        // we don't know if it's prime: let the other functions figure it out
    }

    BigInteger.prototype.isPrime = function () {
        var isPrime = isBasicPrime(this);
        if (isPrime !== undefined) return isPrime;
        var n = this.abs(),
            nPrev = n.prev();
        var a = [2, 3, 5, 7, 11, 13, 17, 19],
            b = nPrev,
            d, t, i, x;
        while (b.isEven()) b = b.divide(2);
        for (i = 0; i < a.length; i++) {
            x = bigInt(a[i]).modPow(b, n);
            if (x.equals(Integer[1]) || x.equals(nPrev)) continue;
            for (t = true, d = b; t && d.lesser(nPrev) ; d = d.multiply(2)) {
                x = x.square().mod(n);
                if (x.equals(nPrev)) t = false;
            }
            if (t) return false;
        }
        return true;
    };
    SmallInteger.prototype.isPrime = BigInteger.prototype.isPrime;

    BigInteger.prototype.isProbablePrime = function (iterations) {
        var isPrime = isBasicPrime(this);
        if (isPrime !== undefined) return isPrime;
        var n = this.abs();
        var t = iterations === undefined ? 5 : iterations;
        // use the Fermat primality test
        for (var i = 0; i < t; i++) {
            var a = bigInt.randBetween(2, n.minus(2));
            if (!a.modPow(n.prev(), n).isUnit()) return false; // definitely composite
        }
        return true; // large chance of being prime
    };
    SmallInteger.prototype.isProbablePrime = BigInteger.prototype.isProbablePrime;

    BigInteger.prototype.modInv = function (n) {
        var t = bigInt.zero, newT = bigInt.one, r = parseValue(n), newR = this.abs(), q, lastT, lastR;
        while (!newR.equals(bigInt.zero)) {
            q = r.divide(newR);
            lastT = t;
            lastR = r;
            t = newT;
            r = newR;
            newT = lastT.subtract(q.multiply(newT));
            newR = lastR.subtract(q.multiply(newR));
        }
        if (!r.equals(1)) throw new Error(this.toString() + " and " + n.toString() + " are not co-prime");
        if (t.compare(0) === -1) {
            t = t.add(n);
        }
        if (this.isNegative()) {
            return t.negate();
        }
        return t;
    };

    SmallInteger.prototype.modInv = BigInteger.prototype.modInv;

    BigInteger.prototype.next = function () {
        var value = this.value;
        if (this.sign) {
            return subtractSmall(value, 1, this.sign);
        }
        return new BigInteger(addSmall(value, 1), this.sign);
    };
    SmallInteger.prototype.next = function () {
        var value = this.value;
        if (value + 1 < MAX_INT) return new SmallInteger(value + 1);
        return new BigInteger(MAX_INT_ARR, false);
    };

    BigInteger.prototype.prev = function () {
        var value = this.value;
        if (this.sign) {
            return new BigInteger(addSmall(value, 1), true);
        }
        return subtractSmall(value, 1, this.sign);
    };
    SmallInteger.prototype.prev = function () {
        var value = this.value;
        if (value - 1 > -MAX_INT) return new SmallInteger(value - 1);
        return new BigInteger(MAX_INT_ARR, true);
    };

    var powersOfTwo = [1];
    while (powersOfTwo[powersOfTwo.length - 1] <= BASE) powersOfTwo.push(2 * powersOfTwo[powersOfTwo.length - 1]);
    var powers2Length = powersOfTwo.length, highestPower2 = powersOfTwo[powers2Length - 1];

    function shift_isSmall(n) {
        return ((typeof n === "number" || typeof n === "string") && +Math.abs(n) <= BASE) ||
            (n instanceof BigInteger && n.value.length <= 1);
    }

    BigInteger.prototype.shiftLeft = function (n) {
        if (!shift_isSmall(n)) {
            throw new Error(String(n) + " is too large for shifting.");
        }
        n = +n;
        if (n < 0) return this.shiftRight(-n);
        var result = this;
        while (n >= powers2Length) {
            result = result.multiply(highestPower2);
            n -= powers2Length - 1;
        }
        return result.multiply(powersOfTwo[n]);
    };
    SmallInteger.prototype.shiftLeft = BigInteger.prototype.shiftLeft;

    BigInteger.prototype.shiftRight = function (n) {
        var remQuo;
        if (!shift_isSmall(n)) {
            throw new Error(String(n) + " is too large for shifting.");
        }
        n = +n;
        if (n < 0) return this.shiftLeft(-n);
        var result = this;
        while (n >= powers2Length) {
            if (result.isZero()) return result;
            remQuo = divModAny(result, highestPower2);
            result = remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
            n -= powers2Length - 1;
        }
        remQuo = divModAny(result, powersOfTwo[n]);
        return remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
    };
    SmallInteger.prototype.shiftRight = BigInteger.prototype.shiftRight;

    function bitwise(x, y, fn) {
        y = parseValue(y);
        var xSign = x.isNegative(), ySign = y.isNegative();
        var xRem = xSign ? x.not() : x,
            yRem = ySign ? y.not() : y;
        var xBits = [], yBits = [];
        var xStop = false, yStop = false;
        while (!xStop || !yStop) {
            if (xRem.isZero()) { // virtual sign extension for simulating two's complement
                xStop = true;
                xBits.push(xSign ? 1 : 0);
            }
            else if (xSign) xBits.push(xRem.isEven() ? 1 : 0); // two's complement for negative numbers
            else xBits.push(xRem.isEven() ? 0 : 1);

            if (yRem.isZero()) {
                yStop = true;
                yBits.push(ySign ? 1 : 0);
            }
            else if (ySign) yBits.push(yRem.isEven() ? 1 : 0);
            else yBits.push(yRem.isEven() ? 0 : 1);

            xRem = xRem.over(2);
            yRem = yRem.over(2);
        }
        var result = [];
        for (var i = 0; i < xBits.length; i++) result.push(fn(xBits[i], yBits[i]));
        var sum = bigInt(result.pop()).negate().times(bigInt(2).pow(result.length));
        while (result.length) {
            sum = sum.add(bigInt(result.pop()).times(bigInt(2).pow(result.length)));
        }
        return sum;
    }

    BigInteger.prototype.not = function () {
        return this.negate().prev();
    };
    SmallInteger.prototype.not = BigInteger.prototype.not;

    BigInteger.prototype.and = function (n) {
        return bitwise(this, n, function (a, b) { return a & b; });
    };
    SmallInteger.prototype.and = BigInteger.prototype.and;

    BigInteger.prototype.or = function (n) {
        return bitwise(this, n, function (a, b) { return a | b; });
    };
    SmallInteger.prototype.or = BigInteger.prototype.or;

    BigInteger.prototype.xor = function (n) {
        return bitwise(this, n, function (a, b) { return a ^ b; });
    };
    SmallInteger.prototype.xor = BigInteger.prototype.xor;

    var LOBMASK_I = 1 << 30, LOBMASK_BI = (BASE & -BASE) * (BASE & -BASE) | LOBMASK_I;
    function roughLOB(n) { // get lowestOneBit (rough)
        // SmallInteger: return Min(lowestOneBit(n), 1 << 30)
        // BigInteger: return Min(lowestOneBit(n), 1 << 14) [BASE=1e7]
        var v = n.value, x = typeof v === "number" ? v | LOBMASK_I : v[0] + v[1] * BASE | LOBMASK_BI;
        return x & -x;
    }

    function max(a, b) {
        a = parseValue(a);
        b = parseValue(b);
        return a.greater(b) ? a : b;
    }
    function min(a, b) {
        a = parseValue(a);
        b = parseValue(b);
        return a.lesser(b) ? a : b;
    }
    function gcd(a, b) {
        a = parseValue(a).abs();
        b = parseValue(b).abs();
        if (a.equals(b)) return a;
        if (a.isZero()) return b;
        if (b.isZero()) return a;
        var c = Integer[1], d, t;
        while (a.isEven() && b.isEven()) {
            d = Math.min(roughLOB(a), roughLOB(b));
            a = a.divide(d);
            b = b.divide(d);
            c = c.multiply(d);
        }
        while (a.isEven()) {
            a = a.divide(roughLOB(a));
        }
        do {
            while (b.isEven()) {
                b = b.divide(roughLOB(b));
            }
            if (a.greater(b)) {
                t = b; b = a; a = t;
            }
            b = b.subtract(a);
        } while (!b.isZero());
        return c.isUnit() ? a : a.multiply(c);
    }
    function lcm(a, b) {
        a = parseValue(a).abs();
        b = parseValue(b).abs();
        return a.divide(gcd(a, b)).multiply(b);
    }
    function randBetween(a, b) {
        a = parseValue(a);
        b = parseValue(b);
        var low = min(a, b), high = max(a, b);
        var range = high.subtract(low);
        if (range.isSmall) return low.add(Math.round(Math.random() * range));
        var length = range.value.length - 1;
        var result = [], restricted = true;
        for (var i = length; i >= 0; i--) {
            var top = restricted ? range.value[i] : BASE;
            var digit = truncate(Math.random() * top);
            result.unshift(digit);
            if (digit < top) restricted = false;
        }
        result = arrayToSmall(result);
        return low.add(typeof result === "number" ? new SmallInteger(result) : new BigInteger(result, false));
    }
    var parseBase = function (text, base) {
        var length = text.length;
		var i;
		var absBase = Math.abs(base);
		for(var i = 0; i < length; i++) {
			var c = text[i].toLowerCase();
			if(c === "-") continue;
			if(/[a-z0-9]/.test(c)) {
			    if(/[0-9]/.test(c) && +c >= absBase) {
					if(c === "1" && absBase === 1) continue;
                    throw new Error(c + " is not a valid digit in base " + base + ".");
				} else if(c.charCodeAt(0) - 87 >= absBase) {
					throw new Error(c + " is not a valid digit in base " + base + ".");
				}
			}
		}
        if (2 <= base && base <= 36) {
            if (length <= LOG_MAX_INT / Math.log(base)) {
				var result = parseInt(text, base);
				if(isNaN(result)) {
					throw new Error(c + " is not a valid digit in base " + base + ".");
				}
                return new SmallInteger(parseInt(text, base));
            }
        }
        base = parseValue(base);
        var digits = [];
        var isNegative = text[0] === "-";
        for (i = isNegative ? 1 : 0; i < text.length; i++) {
            var c = text[i].toLowerCase(),
                charCode = c.charCodeAt(0);
            if (48 <= charCode && charCode <= 57) digits.push(parseValue(c));
            else if (97 <= charCode && charCode <= 122) digits.push(parseValue(c.charCodeAt(0) - 87));
            else if (c === "<") {
                var start = i;
                do { i++; } while (text[i] !== ">");
                digits.push(parseValue(text.slice(start + 1, i)));
            }
            else throw new Error(c + " is not a valid character");
        }
        return parseBaseFromArray(digits, base, isNegative);
    };

    function parseBaseFromArray(digits, base, isNegative) {
        var val = Integer[0], pow = Integer[1], i;
        for (i = digits.length - 1; i >= 0; i--) {
            val = val.add(digits[i].times(pow));
            pow = pow.times(base);
        }
        return isNegative ? val.negate() : val;
    }

    function stringify(digit) {
        var v = digit.value;
        if (typeof v === "number") v = [v];
        if (v.length === 1 && v[0] <= 35) {
            return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(v[0]);
        }
        return "<" + v + ">";
    }
    function toBase(n, base) {
        base = bigInt(base);
        if (base.isZero()) {
            if (n.isZero()) return "0";
            throw new Error("Cannot convert nonzero numbers to base 0.");
        }
        if (base.equals(-1)) {
            if (n.isZero()) return "0";
            if (n.isNegative()) return new Array(1 - n).join("10");
            return "1" + new Array(+n).join("01");
        }
        var minusSign = "";
        if (n.isNegative() && base.isPositive()) {
            minusSign = "-";
            n = n.abs();
        }
        if (base.equals(1)) {
            if (n.isZero()) return "0";
            return minusSign + new Array(+n + 1).join(1);
        }
        var out = [];
        var left = n, divmod;
        while (left.isNegative() || left.compareAbs(base) >= 0) {
            divmod = left.divmod(base);
            left = divmod.quotient;
            var digit = divmod.remainder;
            if (digit.isNegative()) {
                digit = base.minus(digit).abs();
                left = left.next();
            }
            out.push(stringify(digit));
        }
        out.push(stringify(left));
        return minusSign + out.reverse().join("");
    }

    BigInteger.prototype.toString = function (radix) {
        if (radix === undefined) radix = 10;
        if (radix !== 10) return toBase(this, radix);
        var v = this.value, l = v.length, str = String(v[--l]), zeros = "0000000", digit;
        while (--l >= 0) {
            digit = String(v[l]);
            str += zeros.slice(digit.length) + digit;
        }
        var sign = this.sign ? "-" : "";
        return sign + str;
    };

    SmallInteger.prototype.toString = function (radix) {
        if (radix === undefined) radix = 10;
        if (radix != 10) return toBase(this, radix);
        return String(this.value);
    };
    BigInteger.prototype.toJSON = SmallInteger.prototype.toJSON = function() { return this.toString(); }

    BigInteger.prototype.valueOf = function () {
        return +this.toString();
    };
    BigInteger.prototype.toJSNumber = BigInteger.prototype.valueOf;

    SmallInteger.prototype.valueOf = function () {
        return this.value;
    };
    SmallInteger.prototype.toJSNumber = SmallInteger.prototype.valueOf;

    function parseStringValue(v) {
            if (isPrecise(+v)) {
                var x = +v;
                if (x === truncate(x))
                    return new SmallInteger(x);
                throw "Invalid integer: " + v;
            }
            var sign = v[0] === "-";
            if (sign) v = v.slice(1);
            var split = v.split(/e/i);
            if (split.length > 2) throw new Error("Invalid integer: " + split.join("e"));
            if (split.length === 2) {
                var exp = split[1];
                if (exp[0] === "+") exp = exp.slice(1);
                exp = +exp;
                if (exp !== truncate(exp) || !isPrecise(exp)) throw new Error("Invalid integer: " + exp + " is not a valid exponent.");
                var text = split[0];
                var decimalPlace = text.indexOf(".");
                if (decimalPlace >= 0) {
                    exp -= text.length - decimalPlace - 1;
                    text = text.slice(0, decimalPlace) + text.slice(decimalPlace + 1);
                }
                if (exp < 0) throw new Error("Cannot include negative exponent part for integers");
                text += (new Array(exp + 1)).join("0");
                v = text;
            }
            var isValid = /^([0-9][0-9]*)$/.test(v);
            if (!isValid) throw new Error("Invalid integer: " + v);
            var r = [], max = v.length, l = LOG_BASE, min = max - l;
            while (max > 0) {
                r.push(+v.slice(min, max));
                min -= l;
                if (min < 0) min = 0;
                max -= l;
            }
            trim(r);
            return new BigInteger(r, sign);
    }

    function parseNumberValue(v) {
        if (isPrecise(v)) {
            if (v !== truncate(v)) throw new Error(v + " is not an integer.");
            return new SmallInteger(v);
        }
        return parseStringValue(v.toString());
    }

    function parseValue(v) {
        if (typeof v === "number") {
            return parseNumberValue(v);
        }
        if (typeof v === "string") {
            return parseStringValue(v);
        }
        return v;
    }
    // Pre-define numbers in range [-999,999]
    for (var i = 0; i < 1000; i++) {
        Integer[i] = new SmallInteger(i);
        if (i > 0) Integer[-i] = new SmallInteger(-i);
    }
    // Backwards compatibility
    Integer.one = Integer[1];
    Integer.zero = Integer[0];
    Integer.minusOne = Integer[-1];
    Integer.max = max;
    Integer.min = min;
    Integer.gcd = gcd;
    Integer.lcm = lcm;
    Integer.isInstance = function (x) { return x instanceof BigInteger || x instanceof SmallInteger; };
    Integer.randBetween = randBetween;

    Integer.fromArray = function (digits, base, isNegative) {
        return parseBaseFromArray(digits.map(parseValue), parseValue(base || 10), isNegative);
    };

    return Integer;
})();

// Node.js check
if (typeof module !== "undefined" && module.hasOwnProperty("exports")) {
    module.exports = bigInt;
}

//amd check
if ( true ) {
  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
    return bigInt;
  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */



function peg$subclass(child, parent) {
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
}

function peg$SyntaxError(message, expected, found, location) {
  this.message  = message;
  this.expected = expected;
  this.found    = found;
  this.location = location;
  this.name     = "SyntaxError";

  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}

peg$subclass(peg$SyntaxError, Error);

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return "\"" + literalEscape(expectation.text) + "\"";
        },

        "class": function(expectation) {
          var escapedParts = "",
              i;

          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts += expectation.parts[i] instanceof Array
              ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
              : classEscape(expectation.parts[i]);
          }

          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },

        any: function(expectation) {
          return "any character";
        },

        end: function(expectation) {
          return "end of input";
        },

        other: function(expectation) {
          return expectation.description;
        }
      };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/"/g,  '\\"')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/\]/g, '\\]')
      .replace(/\^/g, '\\^')
      .replace(/-/g,  '\\-')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = new Array(expected.length),
        i, j;

    for (i = 0; i < expected.length; i++) {
      descriptions[i] = describeExpectation(expected[i]);
    }

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== void 0 ? options : {};

  var peg$FAILED = {},

      peg$startRuleFunctions = { Stack: peg$parseStack },
      peg$startRuleFunction  = peg$parseStack,

      peg$c0 = function(terms) {
              return terms.filter(term => term !== '')
          },
      peg$c1 = "#",
      peg$c2 = peg$literalExpectation("#", false),
      peg$c3 = /^[^\r\n]/,
      peg$c4 = peg$classExpectation(["\r", "\n"], true, false),
      peg$c5 = function() {
              return ''
          },
      peg$c6 = peg$otherExpectation("block"),
      peg$c7 = "{",
      peg$c8 = peg$literalExpectation("{", false),
      peg$c9 = "}",
      peg$c10 = peg$literalExpectation("}", false),
      peg$c11 = function(body) {
              return {
                  type: 'block',
                  value: body
              }
          },
      peg$c12 = peg$otherExpectation("operator"),
      peg$c13 = function(op) {
              return {
                  type: 'operator',
                  value: op
              }
          },
      peg$c14 = /^[^A-Z0-9{}]/,
      peg$c15 = peg$classExpectation([["A", "Z"], ["0", "9"], "{", "}"], true, false),
      peg$c16 = "@",
      peg$c17 = peg$literalExpectation("@", false),
      peg$c18 = /^[0-9a-n]/,
      peg$c19 = peg$classExpectation([["0", "9"], ["a", "n"]], false, false),
      peg$c20 = function(suffix) {
              return '@' + suffix
          },
      peg$c21 = ":",
      peg$c22 = peg$literalExpectation(":", false),
      peg$c23 = /^[A-G]/,
      peg$c24 = peg$classExpectation([["A", "G"]], false, false),
      peg$c25 = function(v) {
              return ':' + v
          },
      peg$c26 = "m",
      peg$c27 = peg$literalExpectation("m", false),
      peg$c28 = /^[a-zA-Z]/,
      peg$c29 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false),
      peg$c30 = function(suffix) {
              return 'm' + suffix
          },
      peg$c31 = peg$otherExpectation("character"),
      peg$c32 = "'",
      peg$c33 = peg$literalExpectation("'", false),
      peg$c34 = peg$anyExpectation(),
      peg$c35 = function(c) {
              return {
                  type: 'char',
                  value: c
              }
          },
      peg$c36 = peg$otherExpectation("string"),
      peg$c37 = "\"",
      peg$c38 = peg$literalExpectation("\"", false),
      peg$c39 = function(content) {
              return {
                  type: 'string',
                  value: content.join('')
              }
          },
      peg$c40 = "\\\"",
      peg$c41 = peg$literalExpectation("\\\"", false),
      peg$c42 = function(c) {
              return c
          },
      peg$c43 = peg$otherExpectation("float"),
      peg$c44 = /^[0-9]/,
      peg$c45 = peg$classExpectation([["0", "9"]], false, false),
      peg$c46 = ".",
      peg$c47 = peg$literalExpectation(".", false),
      peg$c48 = function(whole, fract) {
              if (whole.length === 0 && fract.length === 0) {
                  throw new Error('. must be accompanied by at least 1 digit')
              }

              return {
                  type: 'float',
                  value: parseFloat(whole.join('') + '.' + fract.join(''))
              }
          },
      peg$c49 = peg$otherExpectation("bigint"),
      peg$c50 = function(digits) {
              return {
                  type: 'bigint',
                  value: bigInt(digits.join(''), 10)
              }
          },
      peg$c51 = "x",
      peg$c52 = peg$literalExpectation("x", false),
      peg$c53 = /^[0-9a-fA-F]/,
      peg$c54 = peg$classExpectation([["0", "9"], ["a", "f"], ["A", "F"]], false, false),
      peg$c55 = function(digits) {
              return {
                  type: 'bigint',
                  value: bigInt(digits.join(''), 16)
              }
          },
      peg$c56 = peg$otherExpectation("variable"),
      peg$c57 = /^[A-Z]/,
      peg$c58 = peg$classExpectation([["A", "Z"]], false, false),
      peg$c59 = function(v) {
              return {
                  type: 'variable',
                  value: v
              }
          },
      peg$c60 = peg$otherExpectation("whitespace"),
      peg$c61 = /^[ \t\r\n]/,
      peg$c62 = peg$classExpectation([" ", "\t", "\r", "\n"], false, false),

      peg$currPos          = 0,
      peg$savedPos         = 0,
      peg$posDetailsCache  = [{ line: 1, column: 1 }],
      peg$maxFailPos       = 0,
      peg$maxFailExpected  = [],
      peg$silentFails      = 0,

      peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos], p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line:   details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos),
        endPosDetails   = peg$computePosDetails(endPos);

    return {
      start: {
        offset: startPos,
        line:   startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line:   endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parseStack() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseComment();
    if (s2 === peg$FAILED) {
      s2 = peg$parseTerm();
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parseComment();
      if (s2 === peg$FAILED) {
        s2 = peg$parseTerm();
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c0(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseComment() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 35) {
      s1 = peg$c1;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c2); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c3.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c4); }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (peg$c3.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c4); }
        }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseWS();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c5();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseTerm() {
    var s0;

    s0 = peg$parseChar();
    if (s0 === peg$FAILED) {
      s0 = peg$parseString();
      if (s0 === peg$FAILED) {
        s0 = peg$parseFloat();
        if (s0 === peg$FAILED) {
          s0 = peg$parseBigInt();
          if (s0 === peg$FAILED) {
            s0 = peg$parseBlock();
            if (s0 === peg$FAILED) {
              s0 = peg$parseVariable();
              if (s0 === peg$FAILED) {
                s0 = peg$parseOperator();
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseBlock() {
    var s0, s1, s2, s3, s4, s5;

    peg$silentFails++;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c7;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c8); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseWS();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseStack();
        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 125) {
            s4 = peg$c9;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c10); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseWS();
            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c11(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c6); }
    }

    return s0;
  }

  function peg$parseOperator() {
    var s0, s1, s2;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseMathOp();
    if (s1 === peg$FAILED) {
      s1 = peg$parseRotateOp();
      if (s1 === peg$FAILED) {
        s1 = peg$parseSetOp();
        if (s1 === peg$FAILED) {
          s1 = peg$parseAnyOp();
        }
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseWS();
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c13(s1);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c12); }
    }

    return s0;
  }

  function peg$parseAnyOp() {
    var s0;

    if (peg$c14.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c15); }
    }

    return s0;
  }

  function peg$parseRotateOp() {
    var s0, s1, s2;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 64) {
      s1 = peg$c16;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c17); }
    }
    if (s1 !== peg$FAILED) {
      if (peg$c18.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c19); }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c20(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseSetOp() {
    var s0, s1, s2;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 58) {
      s1 = peg$c21;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c22); }
    }
    if (s1 !== peg$FAILED) {
      if (peg$c23.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c24); }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c25(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseMathOp() {
    var s0, s1, s2;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 109) {
      s1 = peg$c26;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c27); }
    }
    if (s1 !== peg$FAILED) {
      if (peg$c28.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c30(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseChar() {
    var s0, s1, s2, s3;

    peg$silentFails++;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 39) {
      s1 = peg$c32;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c33); }
    }
    if (s1 !== peg$FAILED) {
      if (input.length > peg$currPos) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c34); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseWS();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c35(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c31); }
    }

    return s0;
  }

  function peg$parseString() {
    var s0, s1, s2, s3, s4;

    peg$silentFails++;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 34) {
      s1 = peg$c37;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c38); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parseSChar();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parseSChar();
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 34) {
          s3 = peg$c37;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c38); }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseWS();
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c39(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c36); }
    }

    return s0;
  }

  function peg$parseSChar() {
    var s0, s1, s2;

    if (input.substr(peg$currPos, 2) === peg$c40) {
      s0 = peg$c40;
      peg$currPos += 2;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c41); }
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 34) {
        s2 = peg$c37;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c38); }
      }
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = void 0;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        if (input.length > peg$currPos) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c34); }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c42(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parseFloat() {
    var s0, s1, s2, s3, s4;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    if (peg$c44.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c45); }
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      if (peg$c44.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c45); }
      }
    }
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 46) {
        s2 = peg$c46;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c47); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c44.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c45); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c44.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c45); }
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseWS();
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c48(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c43); }
    }

    return s0;
  }

  function peg$parseBigInt() {
    var s0, s1, s2, s3;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    if (peg$c44.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c45); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c44.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c45); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseWS();
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c50(s1);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 120) {
        s1 = peg$c51;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c52); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c53.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c54); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c53.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c54); }
            }
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseWS();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c55(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c49); }
    }

    return s0;
  }

  function peg$parseVariable() {
    var s0, s1, s2;

    peg$silentFails++;
    s0 = peg$currPos;
    if (peg$c57.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c58); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseWS();
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c59(s1);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c56); }
    }

    return s0;
  }

  function peg$parseWS() {
    var s0, s1;

    peg$silentFails++;
    s0 = [];
    if (peg$c61.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c62); }
    }
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      if (peg$c61.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c62); }
      }
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c60); }
    }

    return s0;
  }


      var bigInt = __webpack_require__(1)


  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

module.exports = {
  SyntaxError: peg$SyntaxError,
  parse:       peg$parse
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _array = __webpack_require__(9);

var _array2 = _interopRequireDefault(_array);

var _caret = __webpack_require__(11);

var _caret2 = _interopRequireDefault(_caret);

var _comma = __webpack_require__(12);

var _comma2 = _interopRequireDefault(_comma);

var _display = __webpack_require__(13);

var _display2 = _interopRequireDefault(_display);

var _divide = __webpack_require__(14);

var _divide2 = _interopRequireDefault(_divide);

var _equals = __webpack_require__(15);

var _equals2 = _interopRequireDefault(_equals);

var _float = __webpack_require__(16);

var _float2 = _interopRequireDefault(_float);

var _greaterthan = __webpack_require__(17);

var _greaterthan2 = _interopRequireDefault(_greaterthan);

var _backslash = __webpack_require__(18);

var _backslash2 = _interopRequireDefault(_backslash);

var _lessthan = __webpack_require__(19);

var _lessthan2 = _interopRequireDefault(_lessthan);

var _modulo = __webpack_require__(20);

var _modulo2 = _interopRequireDefault(_modulo);

var _multiply = __webpack_require__(21);

var _multiply2 = _interopRequireDefault(_multiply);

var _pipe = __webpack_require__(22);

var _pipe2 = _interopRequireDefault(_pipe);

var _plus = __webpack_require__(23);

var _plus2 = _interopRequireDefault(_plus);

var _power = __webpack_require__(24);

var _power2 = _interopRequireDefault(_power);

var _read = __webpack_require__(25);

var _read2 = _interopRequireDefault(_read);

var _rparen = __webpack_require__(26);

var _rparen2 = _interopRequireDefault(_rparen);

var _semicolon = __webpack_require__(27);

var _semicolon2 = _interopRequireDefault(_semicolon);

var _set = __webpack_require__(28);

var _set2 = _interopRequireDefault(_set);

var _subtract = __webpack_require__(29);

var _subtract2 = _interopRequireDefault(_subtract);

var _permute = __webpack_require__(30);

var _permute2 = _interopRequireDefault(_permute);

var _zip = __webpack_require__(31);

var _zip2 = _interopRequireDefault(_zip);

var _abs = __webpack_require__(32);

var _abs2 = _interopRequireDefault(_abs);

var _cos = __webpack_require__(33);

var _cos2 = _interopRequireDefault(_cos);

var _rand = __webpack_require__(34);

var _rand2 = _interopRequireDefault(_rand);

var _sin = __webpack_require__(35);

var _sin2 = _interopRequireDefault(_sin);

var _tan = __webpack_require__(36);

var _tan2 = _interopRequireDefault(_tan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var operators = [_array2.default, _caret2.default, _comma2.default, _display2.default, _divide2.default, _equals2.default, _float2.default, _greaterthan2.default, _backslash2.default, _lessthan2.default, _modulo2.default, _multiply2.default, _plus2.default, _power2.default, _read2.default, _pipe2.default, _semicolon2.default, _rparen2.default, _subtract2.default, _zip2.default, _abs2.default, _cos2.default, _rand2.default, _sin2.default, _tan2.default];

var table = {};
operators.forEach(function (op) {
    return table[op.name] = op;
});

'0123456789abcdefghijklmn'.split('').forEach(function (permutation) {
    table['@' + permutation] = (0, _permute2.default)(permutation);
});

'ABCDEFG'.split('').forEach(function (v) {
    table[':' + v] = (0, _set2.default)(v);
});

exports.default = table;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function commutative(sig, desc, _body) {
    var reversedSig = [];
    for (var i = sig.length - 1; i >= 0; --i) {
        reversedSig.push(sig[i]);
    }

    return [{
        sig: sig,
        desc: desc,
        body: _body
    }, {
        sig: reversedSig,
        desc: desc,
        body: function body(context, a, b) {
            return _body(context, b, a);
        }
    }];
}
exports.commutative = commutative;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bigInteger = __webpack_require__(1);

var _bigInteger2 = _interopRequireDefault(_bigInteger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Variable = function Variable(options) {
    _classCallCheck(this, Variable);

    var name = options.name,
        value = options.value,
        desc = options.desc;


    this.name = name;
    this.value = value;
    this.desc = desc;
};

exports.default = [new Variable({ name: 'N', desc: 'An empty array.', value: { type: 'array', value: [] } }), new Variable({ name: 'O', desc: 'One.', value: { type: 'bigint', value: (0, _bigInteger2.default)(1) } }), new Variable({ name: 'S', desc: 'An empty string.', value: { type: 'string', value: '' } }), new Variable({ name: 'T', desc: 'Two.', value: { type: 'bigint', value: (0, _bigInteger2.default)(2) } })];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Context = __webpack_require__(7);

var _Context2 = _interopRequireDefault(_Context);

__webpack_require__(37);

__webpack_require__(38);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inputForm = document.getElementById('inputForm');
var codeField = document.getElementById('code');
var inputField = document.getElementById('input');
var outputField = document.getElementById('output');
var byteCount = document.getElementById('byteCount');

var searchParams = new URLSearchParams(window.location.search);
var code = searchParams.get('try');
var input = searchParams.get('input');

if (code !== null) {
    codeField.value = unescape(code);
    byteCount.innerHTML = codeField.value.length + ' bytes';
}

if (input !== null) {
    inputField.value = unescape(input);
}

codeField.addEventListener('keyup', function (ev) {
    byteCount.innerHTML = ev.target.value.length + ' bytes';
});

inputForm.addEventListener('submit', function (ev) {
    ev.preventDefault();

    var code = codeField.value;
    var input = inputField.value;

    try {
        var context = new _Context2.default(code, input);
        var output = context.execute();

        outputField.style.color = '#000';
        outputField.value = output;
    } catch (e) {
        outputField.style.color = '#c0392b';
        outputField.value = e.stack.toString();
    }
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _grammar = __webpack_require__(2);

var _grammar2 = _interopRequireDefault(_grammar);

var _operators = __webpack_require__(3);

var _operators2 = _interopRequireDefault(_operators);

var _variables = __webpack_require__(5);

var _variables2 = _interopRequireDefault(_variables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Context = function () {
    function Context(code, input) {
        _classCallCheck(this, Context);

        this.env = _variables2.default.reduce(function (acc, v) {
            acc[v.name] = v.value;
            return acc;
        }, {});

        this.stack = [];
        this.code = code || '';
        this.input = input || '';
        this.output = '';
    }

    _createClass(Context, [{
        key: 'execute',
        value: function execute() {
            var _this = this;

            var tokens = _grammar2.default.parse(this.code);

            tokens.forEach(function (token) {
                return _this.executeToken(token);
            });
            this.stack.forEach(function (elem) {
                return _this.displayToken(elem);
            });

            return this.output;
        }
    }, {
        key: 'push',
        value: function push(type, value) {
            if (typeof value === 'undefined') {
                this.stack.push(type);
            } else {
                this.stack.push({ type: type, value: value });
            }
        }
    }, {
        key: 'executeBlock',
        value: function executeBlock(block, args) {
            var _this2 = this;

            args = args || [];
            args.forEach(function (arg) {
                return _this2.stack.push(arg);
            });

            block.value.forEach(function (token) {
                return _this2.executeToken(token);
            });
        }
    }, {
        key: 'executeToken',
        value: function executeToken(token) {
            if (token.type === 'operator') {
                var op = _operators2.default[token.value];

                if (typeof op === 'undefined') {
                    throw new Error('unsupported operator: ' + token.value);
                }

                op.execute(this);
            } else if (token.type === 'variable') {
                var value = typeof this.env[token.value] === 'undefined' ? { type: 'bigint', value: bigInt(0) } : this.env[token.value];

                this.stack.push(value);
            } else {
                this.stack.push(token);
            }
        }
    }, {
        key: 'displayToken',
        value: function displayToken(token) {
            var _this3 = this;

            switch (token.type) {
                case 'string':
                    this.output += token.value;
                    break;

                case 'bigint':
                    this.output += token.value.toString();
                    break;

                case 'float':
                    this.output += token.value.toString();
                    break;

                case 'array':
                    token.value.forEach(function (child) {
                        return _this3.displayToken(child);
                    });
                    break;

                case 'block':
                    this.output += '{ ';

                    token.value.forEach(function (child) {
                        _this3.displayToken(child);
                        _this3.output += ' ';
                    });

                    this.output += '}';
                    break;

                // needed only for printing block source code
                case 'operator':
                    this.output += token.value;
                    break;

                case 'char':
                    this.output += token.value;
            }
        }
    }]);

    return Context;
}();

exports.default = Context;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: ']',
    clauses: [{
        sig: [],
        desc: 'Builds array from current stack.',
        body: function body(context) {
            var value = context.stack;
            context.stack = [{ type: 'array', value: value }];
        }
    }]
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.canCoerce = canCoerce;
exports.coerce = coerce;
var coercions = {
    'char': {
        'string': function string(value) {
            return value;
        }
    },
    'array': {
        'string': function string(xs) {
            return xs.map(function (x) {
                return coerce(x, 'float').value;
            }).map(function (x) {
                return String.fromCodePoint(x);
            }).join('');
        }
    },
    'bigint': {
        'float': function float(value) {
            return value.toJSNumber();
        }
    }
};

function canCoerce(term, desiredType) {
    if (desiredType === 'any' || term.type === desiredType) {
        return true;
    }

    return coercions[term.type] && coercions[term.type][desiredType];
}

function coerce(term, desiredType) {
    if (desiredType === 'any' || term.type === desiredType) {
        return term;
    }

    return {
        type: desiredType,
        value: coercions[term.type][desiredType](term.value)
    };
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: '^',
    clauses: [{
        sig: ['block', 'block', 'float'],
        desc: 'Evaluates the first block if the number is nonzero, otherwise the second.',
        body: function body(context, t, f, n) {
            if (n.value) {
                context.executeBlock(t);
            } else {
                context.executeBlock(f);
            }
        }
    }, {
        sig: ['any', 'any', 'float'],
        desc: 'Pushes the first value if the number is nonzero, otherwise the second.',
        body: function body(context, t, f, n) {
            context.push(n.value ? t : f);
        }
    }]
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: ',',
    clauses: [{
        sig: ['any'],
        desc: 'Duplicate the top value of the stack.',
        body: function body(context, token) {
            context.push(token);
            context.push(token);
        }
    }]
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: 'd',
    clauses: [{
        sig: ['any'],
        desc: 'Prints a token to the output with a newline.',
        body: function body(context, token) {
            context.displayToken(token);
            context.output += '\n';
        }
    }]
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _helper = __webpack_require__(4);

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: '/',
    clauses: [{
        sig: ['bigint', 'bigint'],
        desc: 'Integer division.',
        body: function body(context, left, right) {
            context.push('bigint', left.value.divide(right.value));
        }
    }, {
        sig: ['float', 'float'],
        desc: 'Floating-point division.',
        body: function body(context, left, right) {
            context.push('float', left.value / right.value);
        }
    }, {
        sig: ['string', 'string'],
        desc: 'Split a string by a separator.',
        body: function body(context, str, sep) {
            var words = str.value.split(sep.value).map(function (value) {
                return { type: 'string', value: value };
            });

            context.push('array', words);
        }
    }].concat((0, _helper.commutative)(['array', 'block'], 'Maps over array with block.', function (context, xs, f) {
        var out = [];

        xs.value.forEach(function (x) {
            context.executeBlock(f, [x]);
            out.push(context.stack.pop());
        });

        context.push('array', out);
    }))
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bigInteger = __webpack_require__(1);

var _bigInteger2 = _interopRequireDefault(_bigInteger);

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: '=',
    clauses: [{
        sig: ['bigint', 'bigint'],
        desc: 'Integer equality.',
        body: function body(context, left, right) {
            var equal = left.value.equals(right.value);
            context.push('bigint', equal ? (0, _bigInteger2.default)(1) : (0, _bigInteger2.default)(0));
        }
    }]
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: 'f',
    clauses: [{
        sig: ['string'],
        desc: 'Parses a floating-point value from a string.',
        body: function body(context, str) {
            context.push('float', parseFloat(str.value));
        }
    }, {
        sig: ['bigint'],
        desc: 'Converts a bigint to its floating-point representation (lossy).',
        body: function body(context, n) {
            context.push('float', n.value.toJSNumber());
        }
    }]
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: '>',
    clauses: [{
        sig: ['array', 'float'],
        desc: 'Takes the first N elements from an array.',
        body: function body(context, arr, n) {
            return context.push('array', arr.value.slice(0, n.value));
        }
    }]
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bigInteger = __webpack_require__(1);

var _bigInteger2 = _interopRequireDefault(_bigInteger);

var _helper = __webpack_require__(4);

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

var _grammar = __webpack_require__(2);

var _grammar2 = _interopRequireDefault(_grammar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: '\\',
    clauses: (0, _helper.commutative)(['block', 'array'], 'Filters an array by a predicate.', function (context, f, arr) {
        var value = [];

        arr.value.forEach(function (x) {
            context.executeBlock(f, [x]);

            var top = context.stack.pop();
            var p = false;

            switch (top.type) {
                case 'bigint':
                    p = !top.value.equals((0, _bigInteger2.default)(0));
                    break;

                case 'float':
                    p = top.value != 0;
                    break;

                case 'string':
                    p = top.value.length > 0;
                    break;
            }

            if (p) {
                value.push(x);
            }
        });

        context.push('array', value);
    }).concat([{
        sig: ['string'],
        desc: 'Evaluates the string as code.',
        body: function body(context, code) {
            var value = _grammar2.default.parse(code.value);
            var block = { type: 'block', value: value };

            context.executeBlock(block);
        }
    }])
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: '<',
    clauses: [{
        sig: ['array', 'float'],
        desc: 'Drops the first N elements from an array.',
        body: function body(context, arr, n) {
            return context.push('array', arr.value.slice(n.value));
        }
    }]
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: '%',
    clauses: [{
        sig: ['bigint', 'bigint'],
        desc: 'Integer modulo operation.',
        body: function body(context, left, right) {
            context.push('bigint', left.value.mod(right.value));
        }
    }, {
        sig: ['float'],
        desc: 'Generate a random integer from 0 to N - 1, inclusive.',
        body: function body(context, n) {
            var value = Math.floor(Math.random() * n.value);
            context.push('float', value);
        }
    }]
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bigInteger = __webpack_require__(1);

var _bigInteger2 = _interopRequireDefault(_bigInteger);

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: '*',
    clauses: [{
        sig: ['bigint', 'bigint'],
        desc: 'Integer multiplication.',
        body: function body(context, left, right) {
            context.push('bigint', left.value.multiply(right.value));
        }
    }, {
        sig: ['float', 'float'],
        desc: 'Floating-point multiplication.',
        body: function body(context, left, right) {
            context.push('float', left.value * right.value);
        }
    }, {
        sig: ['array', 'string'],
        desc: 'Join an array of strings by a string.',
        body: function body(context, arr, str) {
            var value = '';

            if (arr.value.length > 0) {
                value += arr.value[0].value;

                for (var i = 1; i < arr.value.length; ++i) {
                    value += str.value + arr.value[i].value;
                }
            }

            context.push('string', value);
        }
    }, {
        sig: ['array', 'float'],
        desc: 'Repeat the input N times to form a new array.',
        body: function body(context, arr, n) {
            var out = [];

            for (var i = 0; i < n.value; ++i) {
                arr.forEach(function (a) {
                    return out.push(a);
                });
            }

            context.push('array', arr);
        }
    }, {
        sig: ['string', 'float'],
        desc: 'Repeat the input N times to form a new string.',
        body: function body(context, str, n) {
            var out = '';

            for (var i = 0; i < n.value; ++i) {
                out += str.value;
            }

            context.push('string', out);
        }
    }, {
        sig: ['block', 'float'],
        desc: 'Execute a block N times. I is set to the number of previously executed blocks.',
        body: function body(context, f, n) {
            for (var i = 0; i < n.value; ++i) {
                context.env['I'] = { type: 'bigint', value: (0, _bigInteger2.default)(i) };
                context.executeBlock(f, []);
            }
        }
    }]
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bigInteger = __webpack_require__(1);

var _bigInteger2 = _interopRequireDefault(_bigInteger);

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: '|',
    clauses: [{
        sig: ['bigint', 'bigint'],
        desc: 'Checks whether the first number is divisible by the second.',
        body: function body(context, left, right) {
            var result = left.value.isDivisibleBy(right.value) ? _bigInteger2.default[1] : _bigInteger2.default[0];

            context.push('bigint', result);
        }
    }]
});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var add = function add(type) {
    return function (context, left, right) {
        context.push(type, left.value + right.value);
    };
};

exports.default = new _Operator2.default({
    name: '+',
    clauses: [{
        sig: ['bigint', 'bigint'],
        desc: 'Integer addition.',
        body: function body(context, left, right) {
            context.push('bigint', left.value.add(right.value));
        }
    }, {
        sig: ['float', 'float'],
        desc: 'Floating-point addition.',
        body: add('float')
    }, {
        sig: ['array', 'array'],
        desc: 'Concatenate two arrays together.',
        body: function body(context, left, right) {
            context.push('array', left.value.concat(right.value));
        }
    }, {
        sig: ['string', 'string'],
        desc: 'Concatenate strings and characters together.',
        body: add('string')
    }]
});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: 'p',
    clauses: [{
        sig: ['bigint', 'bigint'],
        desc: 'Raises an integer to a power.',
        body: function body(context, left, right) {
            context.push('bigint', left.value.pow(right.value));
        }
    }]
});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

var _grammar = __webpack_require__(2);

var _grammar2 = _interopRequireDefault(_grammar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: 'r',
    clauses: [{
        sig: [],
        desc: 'Consumes the entire input and parses it into a token.',
        body: function body(context) {
            if (context.input.trim().length === 0) {
                throw new Error('No input to parse from');
            }

            var _parser$parse = _grammar2.default.parse(context.input),
                _parser$parse2 = _slicedToArray(_parser$parse, 1),
                token = _parser$parse2[0];

            context.input = '';
            context.push(token);
        }
    }]
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bigInteger = __webpack_require__(1);

var _bigInteger2 = _interopRequireDefault(_bigInteger);

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: ')',
    clauses: [{
        sig: ['bigint'],
        desc: 'Increment by one.',
        body: function body(context, x) {
            context.push('bigint', x.value.add(_bigInteger2.default[1]));
        }
    }]
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: ';',
    clauses: [{
        sig: ['any'],
        desc: 'Drop the top element of the stack.',
        body: function body(context) {}
    }]
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (v) {
    return new _Operator2.default({
        name: ':' + v,
        clauses: [{
            sig: ['any'],
            desc: 'Sets the variable ' + v + '.',
            body: function body(context, value) {
                context.env[v] = value;
            }
        }]
    });
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: '-',
    clauses: [{
        sig: ['bigint', 'bigint'],
        desc: 'Integer subtraction.',
        body: function body(context, left, right) {
            context.push('bigint', left.value.subtract(right.value));
        }
    }, {
        sig: ['float', 'float'],
        desc: 'Floating-point subtraction.',
        body: function body(context, left, right) {
            context.push('float', left.value - right.value);
        }
    }]
});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alphabet = '0123456789abcdefghijklmn';
var orderings = {};

// highly lazy way of generating all permutations
for (var i = 1; i <= 4; ++i) {
    for (var j = 1; j <= 4; ++j) {
        for (var k = 1; k <= 4; ++k) {
            for (var l = 1; l <= 4; ++l) {
                var s = [i, j, k, l].sort();

                if (s[0] == 1 && s[1] == 2 && s[2] == 3 && s[3] == 4) {
                    orderings[i.toString() + j + k + l] = true;
                }
            }
        }
    }
}

// alphabetic is as good as anything
// thanks kyle
orderings = Object.keys(orderings).sort();

exports.default = function (permutation) {
    var index = alphabet.indexOf(permutation);
    var ordering = orderings[index];

    return new _Operator2.default({
        name: '@' + permutation,
        clauses: [{
            sig: [],
            desc: 'Stack permutation <pre>1234</pre> -> <pre>' + ordering + '</pre>.',
            body: function body(context) {
                var indices = ordering.split('').map(function (index) {
                    return parseInt(index, 10);
                });
                var nextIndex = 0;

                var stack = context.stack.splice(-4);
                var out = [];

                for (var _i = 0; _i < stack.length; ++_i) {
                    while (indices[nextIndex] > stack.length) {
                        ++nextIndex;
                    }

                    out[_i] = stack[indices[nextIndex] - 1];
                    nextIndex++;
                }

                out.forEach(function (token) {
                    return context.push(token);
                });
            }
        }]
    });
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: 'z',
    clauses: [{
        sig: ['array', 'array'],
        desc: 'Zip two arrays together.',
        body: function body(context, left, right) {
            var value = [];
            var max = Math.min(left.value.length, right.value.length);

            for (var i = 0; i < max; ++i) {
                value.push({
                    type: 'array',
                    value: [left.value[i], right.value[i]]
                });
            }

            context.push('array', value);
        }
    }, {
        sig: ['array', 'array', 'block'],
        desc: 'Zip two arrays together, combining elements with the block.',
        body: function body(context, left, right, block) {
            var value = [];
            var max = Math.min(left.value.length, right.value.length);

            for (var i = 0; i < max; ++i) {
                context.push(left.value[i]);
                context.push(right.value[i]);

                context.executeBlock(block);
                value.push(context.stack.pop());
            }

            context.push('array', value);
        }
    }]
});

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: 'ma',
    clauses: [{
        sig: ['bigint'],
        desc: 'Integer absolute value.',
        body: function body(context, left) {
            context.push('bigint', left.value.abs());
        }
    }, {
        sig: ['float'],
        desc: 'Floating-point absolute value.',
        body: function body(context, left) {
            context.push('float', Math.abs(left.value));
        }
    }]
});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: 'mc',
    clauses: [{
        sig: ['float'],
        desc: 'Cosine function.',
        body: function body(context, left) {
            context.push('float', Math.cos(left.value));
        }
    }]
});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: 'mR',
    clauses: [{
        sig: [],
        desc: 'Generate a random floating-point value between 0 and 1.',
        body: function body(context) {
            context.push('float', Math.random());
        }
    }]
});

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: 'ms',
    clauses: [{
        sig: ['float'],
        desc: 'Sine function.',
        body: function body(context, left) {
            context.push('float', Math.sin(left.value));
        }
    }]
});

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Operator = __webpack_require__(0);

var _Operator2 = _interopRequireDefault(_Operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Operator2.default({
    name: 'mt',
    clauses: [{
        sig: ['float'],
        desc: 'Tangent function.',
        body: function body(context, left) {
            context.push('float', Math.tan(left.value));
        }
    }]
});

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _operators = __webpack_require__(3);

var _operators2 = _interopRequireDefault(_operators);

var _variables = __webpack_require__(5);

var _variables2 = _interopRequireDefault(_variables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var variableDocs = document.querySelector('.doc-variables > tbody');
var operatorDocs = document.querySelector('.doc-operators > tbody');

Object.values(_operators2.default).forEach(function (op) {
    var clausesDesc = op.clauses.map(function (clause) {
        var args = clause.sig.map(function (ty) {
            return '<pre>' + ty + '</pre>';
        }).join(', ') || '<pre>none</pre>';
        var desc = clause.desc || 'No description available.';

        return '\n            <tr class="doc-operator">\n                <td>' + op.name + '</td>\n                <td>' + args + '</td>\n                <td>' + desc + '</td>\n            </tr>\n        ';
    });

    operatorDocs.innerHTML += clausesDesc.join('');
});

_variables2.default.forEach(function (v) {
    variableDocs.innerHTML += '\n        <tr class="doc-variable">\n            <td>' + v.name + '</td>\n            <td>' + v.desc + '</td>\n        </tr>\n    ';
});

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var VALID_PAGES = ['interpreter', 'docs'];

function changePage(ev) {
    if (typeof ev !== 'undefined') {
        ev.preventDefault();
        window.location.hash = ev.target.href.replace(/.*#/, '');
    }

    var page = ev && ev.target.href.replace(/.*#/, '') || window.location.hash && window.location.hash.replace(/.*#/, '');

    if (VALID_PAGES.indexOf(page) === -1) {
        page = VALID_PAGES[0];
    }

    var activeLink = document.querySelector('.nav .active');
    if (activeLink !== null) {
        activeLink.className = '';
    }
    document.querySelector('a[href="#' + page + '"]').className = 'active';

    var activePage = document.querySelector('.page.visible');
    if (activePage !== null) {
        activePage.className = 'page';
    }
    document.getElementById(page).className = 'page visible';
}

document.querySelectorAll('.nav a').forEach(function (navLink) {
    return navLink.addEventListener('click', changePage);
});

changePage();

/***/ })
/******/ ]);