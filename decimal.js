var Decimal = {
    parse: function(str) {
        if (/^(\+|\-)?\d+(\.\d+)?$/.test(str)) {
        } else{
            return null;
        }
        
        var components = str.split('.', 2);
        
        var mantissa = parseInt(components.join(''));
        var exponent = -(components[1] || "").length;
        
        return this.create(mantissa,exponent);
    },

    normalize: function(mantissa, exponent, k) {
        if (mantissa == 0) {
            return k(0,0);
        }
        
        while (mantissa % 10 == 0) {
            mantissa /= 10;
            exponent += 1;
        }
        
        return k(mantissa, exponent);
    },
    
    create: function(mantissa, exponent) {
        decimal = 0;
        this.normalize(mantissa, exponent, function(mantissa, exponent) {
            decimal = {
                mantissa: mantissa,
                exponent: exponent,
                
                toString: function() {
                    var m = Math.abs(mantissa).toString();
                    
                    if (exponent > 0) {
                        for (var i = 0; i < exponent; i++) {
                            m = m + "0";
                        }
                    }
                    
                    if (exponent < 0) {
                        var exp = -exponent;
                        var len = m.length;
                        
                        var x = "";
                        var y = "";
                        
                        if (len > exp) {
                            x = m.substring(0, len - exp);
                            y = m.substring(len - exp);
                        } else {
                            x = "0";
                            
                            for (var i = 0; i < exp-len; i++) {
                                y = y + "0";
                            }
                            y = y + m;
                        }
                        m = x + "." + y;
                    }
                    
                    if (mantissa < 0) {
                        m = "-" + m;
                    }
                    return m;
                },
                
                decimalByAdding: function(decimal) {
                    return Decimal.calculate(this, decimal, function(a, b, e) {
                        return Decimal.create(a+b, e);
                    });
                },
                
                decimalBySubtracting: function(decimal) {
                    return Decimal.calculate(this, decimal, function(a, b, e) {
                        return Decimal.create(a-b, e);
                    });
                },
                
                decimalByMultiplyingBy: function(decimal) {
                    return Decimal.calculate(this, decimal, function(a, b, e) {
                        return Decimal.create(a*b, e + e);
                    });
                },
            };
        });
        return decimal;
    },
    
    calculate: function(a, b, proc) {
        var exp = Math.min(a.exponent, b.exponent);
        
        var ma = a.mantissa * Math.pow(10, a.exponent - exp);
        var mb = b.mantissa * Math.pow(10, b.exponent - exp);
        
        return proc(ma, mb, exp);
    },
};

Decimal.zero = Decimal.create(0,0);
Decimal.one = Decimal.create(1,0);

