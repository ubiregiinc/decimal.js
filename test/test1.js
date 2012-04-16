var DecimalTestCase = new YAHOO.tool.TestCase({
    name: "Decimal",
    
    testToString: function() {
        Assert.areEqual("1", Decimal.create(1, 0).toString());
        Assert.areEqual("120", Decimal.create(12, 1).toString());
        Assert.areEqual("1.2", Decimal.create(12, -1).toString());
        Assert.areEqual("-1.2", Decimal.create(-12, -1).toString());
        Assert.areEqual("0.01", Decimal.create(1, -2).toString());
        Assert.areEqual("-0.01", Decimal.create(-1, -2).toString());
        Assert.areEqual("100", Decimal.create(10, 1).toString());
        Assert.areEqual("10", Decimal.create(100, -1).toString());
    },

    testParse: function() {
        Assert.areEqual("1", Decimal.parse("1").toString());
        Assert.areEqual("1.01", Decimal.parse("+1.01").toString());
        Assert.areEqual("-10", Decimal.parse("-10").toString());
        Assert.areEqual("-1.3", Decimal.parse("-1.3").toString());
        Assert.areEqual("1", Decimal.parse("1.00").toString());
        Assert.areEqual("1", Decimal.parse("1").toString());

        Assert.areEqual(null, Decimal.parse("hoge"));
    },

    testNormalize: function() {
        Decimal.normalize(0, 100, function(x,y) {
            Assert.areEqual(0, x);
            Assert.areEqual(0, y);
        });
        Decimal.normalize(10, 0, function(x,y) {
            Assert.areEqual(1, x);
            Assert.areEqual(1, y);
        });
        Decimal.normalize(1000, -1, function(x,y) {
            Assert.areEqual(1, x);
            Assert.areEqual(2, y);
        });
    },

    testCalculate: function() {
        var d = Decimal.calculate(Decimal.parse("1.1"), Decimal.parse("0.03"), function(a, b, e) {
            Assert.areEqual(110, a);
            Assert.areEqual(3, b);
            Assert.areEqual(-2, e);
            return Decimal.create(a+b, e);
        });
        
        Assert.areEqual("1.13", d.toString());

        Decimal.calculate(Decimal.parse("6"), Decimal.parse("-0.6"), function(a, b, e) {
            Assert.areEqual(60, a);
            Assert.areEqual(-6, b);
            Assert.areEqual(-1, e);
        });
    },

    testAdd: function() {
        Assert.areEqual("11", Decimal.parse("10").decimalByAdding(Decimal.parse("1")).toString());
        Assert.areEqual("1",
                        Decimal.parse("0.1")
                        .decimalByAdding(Decimal.parse("0.1"))
                        .decimalByAdding(Decimal.parse("0.1"))
                        .decimalByAdding(Decimal.parse("0.1"))
                        .decimalByAdding(Decimal.parse("0.1"))
                        .decimalByAdding(Decimal.parse("0.1"))
                        .decimalByAdding(Decimal.parse("0.1"))
                        .decimalByAdding(Decimal.parse("0.1"))
                        .decimalByAdding(Decimal.parse("0.1"))
                        .decimalByAdding(Decimal.parse("0.1")).toString());
    },

    testSub: function() {
        Assert.areEqual("0.3", Decimal.parse("1").decimalBySubtracting(Decimal.parse("0.7")).toString());
        Assert.areEqual("0",
                        Decimal.parse("1")
                        .decimalBySubtracting(Decimal.parse("0.1"))
                        .decimalBySubtracting(Decimal.parse("0.1"))
                        .decimalBySubtracting(Decimal.parse("0.1"))
                        .decimalBySubtracting(Decimal.parse("0.1"))
                        .decimalBySubtracting(Decimal.parse("0.1"))
                        .decimalBySubtracting(Decimal.parse("0.1"))
                        .decimalBySubtracting(Decimal.parse("0.1"))
                        .decimalBySubtracting(Decimal.parse("0.1"))
                        .decimalBySubtracting(Decimal.parse("0.1"))
                        .decimalBySubtracting(Decimal.parse("0.1")).toString());
    },

    testMul: function() {
        Assert.areEqual("3.6", Decimal.parse("6").decimalByMultiplyingBy(Decimal.parse("0.6")).toString());
        Assert.areEqual("3600", Decimal.parse("60").decimalByMultiplyingBy(Decimal.parse("60")).toString());
        Assert.areEqual("0", Decimal.parse("6").decimalByMultiplyingBy(Decimal.parse("0")).toString());
        Assert.areEqual("0", Decimal.parse("6").decimalByMultiplyingBy(Decimal.parse("-0")).toString());
    },
});

YAHOO.tool.TestRunner.add(DecimalTestCase);

