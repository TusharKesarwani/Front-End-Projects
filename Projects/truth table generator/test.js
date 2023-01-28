test('Truth Combos', function() {
    var symbols = {};
    var symCount = 6;
    for (var i = 0; i < symCount; i ++) {
        symbols['sym' + i] = true;
    }
    var combos = truth.truthCombos(symbols);
    ok(combos.length === Math.pow(2, symCount), 'Check number of truth combos.');
});

function testExpr(expr, ast) {
    var result = truth.parse(truth.tokenize(expr));
    var actualAst = result[0];
    same(actualAst, ast, 'Verify expression ' + expr);
}

function assertSameAst(expr1, expr2) {
    var ast1 = truth.parse(truth.tokenize(expr1))[0];
    var ast2 = truth.parse(truth.tokenize(expr2))[0];
    same(ast1, ast2, 'Expressions do not parse the same expr1: ' + expr1 + ' expr2: ' + expr2);
}


test('Parser', function() {
    testExpr('singletoken', 'singletoken');
    testExpr('(((singletoken)))', 'singletoken');
    testExpr('a&b', ['&', 'a', 'b']);
    testExpr('a & b', ['&', 'a', 'b']);
    testExpr('a & (((((b)))))', ['&', 'a', 'b']);
    testExpr('verylong101symbolname1 & ((b))', ['&', 'verylong101symbolname1', 'b']);
    testExpr('b & (b & (b & (b & b)))', ['&', 'b', 
                                         ['&', 'b',
                                         ['&', 'b',
                                         ['&', 'b', 'b']]]]);
    testExpr('b & (b & ((!b) & (b & b)))', ['&', 'b', 
                                         ['&', 'b',
                                         ['&', ['!', 'b'],
                                         ['&', 'b', 'b']]]]);
    testExpr('!(a)', ['!', 'a']);
    testExpr('!a', ['!', 'a']);
    testExpr('(!a)', ['!', 'a']);
    testExpr('!(a)', ['!', 'a']);
    testExpr('~a', ['~', 'a']);
    testExpr('(~a)', ['~', 'a']);
    testExpr('(~((a)))', ['~', 'a']);
    testExpr('a & b & c & d', ['&', 'a',
                                    ['&', 'b',
                                          ['&', 'c', 'd']]]);
});

test('Operator precedence', function() {
    assertSameAst('a & b', 'a & b');
    assertSameAst('a & b | c', '(a & b) | c');
    assertSameAst('c | a & b', 'c | (a & b)');
});

test('evalExpr', function() {
    var expr = ['&', 'a', 'b'];
    var bindings = {'a' : true,
                    'b' : false};
    equals(truth.evalExpr(expr, bindings), false);
    bindings = {'a' : true,
                'b' : true};
    equals(truth.evalExpr(expr, bindings), true);

    expr = ['^', 'a', 'b'];
    bindings = {'a' : true,
                'b' : false};
    equals(truth.evalExpr(expr, bindings), true);
    bindings = {'a' : true,
                'b' : true};
    equals(truth.evalExpr(expr, bindings), false);

    expr = ['!', 'a'];
    bindings = {'a' : true};
    equals(truth.evalExpr(expr, bindings), false);

    expr = ['~', 'a'];
    equals(truth.evalExpr(expr, bindings), false);
});

test('tokenizer', function() {
    same(truth.tokenize('longsymbol'), ['longsymbol']);
    same(truth.tokenize('(  longsymbol   | ||'), ['(', 'longsymbol', '|', '|', '|']);
});