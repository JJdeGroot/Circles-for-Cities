 

var CoS = CoS || {};


CoS.domainColour = '#55b496';


CoS.Profile = [ 
        { name: 'Economics', 
            subdomains: ["Wealth & Distribution", "Technology & Infrastructure", "Labour & Welfare", "Consumption & Use", "Accounting & Regulation", "Exchange & Transfer", "Production & Resourcing"],
            questions: [
                "Is the wealth of the urban area sustainable; and is it distributed in way that benefits all?",
                "To what extent is basic infrastructure in urban area appropriate and supportive of a broad cross section of needs?",
                "How sustainable are the conditions of work across the urban area?",
                "How sustainable are the current consumption patterns of the urban area?",
                "How robust are the various accounting and regulatory frameworks in the urban area?",
                "How sustainable is the current movement of money, goods and services into and through the urban area?",
                "How sustainable are the broad patterns of production and resource access in the urban area?",
            ]
         },

        { name: 'Ecology', 
            subdomains: ["Materials & Energy", "Water & Air", "Flora & Fauna", "Habitat & Settlements", "Built Form & Transport", "Embodiment & Sustenance", "Emission & Waste"] ,
            questions: [
                "How sustainable is energy production for the urban area?",
                "How sustainable are the levels of air quality and water quality in the urban environment?",
                "To what extent is biodiversity sustainable across the urban region?",
                "How well does the urban area relate ecologically to the landscape on which it is built?",
                "Does the form of the urban area and its transport system support sustainable living?",
                "How sustainable is the urban area in supporting the physical health of people? "
            ]
        }, 

        { name: 'Culture', 
            subdomains: ["Identity & Engagement", "Creativity & Recreation", "Memory & Projection", "Belief & Ideas", "Gender & Generations", "Enquiry & Learning", "Wellbeing & Health"] ,
            questions: [
                "Does the urban area have a positive cultural identity that brings people together over and above the various differences in their individual identities?",
                "How sustainable are creative pursuits in the urban area – including sporting activities and creative leisure activities?",
                "How well does the urban area deal with its history in relation to projecting visions of possible alternative futures?",
                "Do residents of the urban area have a strong sense of purpose and meaning?",
                "To what extent is there gender and generational well-being across different groups?",
                "How sustainable is formal and informal learning in the urban region?",
                "What is the general level of well-being across different groups of residents?",
            ]
        }, 
        
        { name: 'Politics', 
            subdomains: ["Ethics & Accountability", "Dialogue & Reconciliation", "Security & Accord", "Representation & Negotiation", "Communication & Critique", "Law & Justice", "Organization & Governance"] ,
            questions: [
                "How ethical is social life in the urban area?",
                "Is meaningful dialogue possible between groups with signifi cant political difference in the urban area?",
                "How secure and peaceful is the urban area?",
                "How well are citizens of the urban area represented politically?",
                "How sustainable is social communication access in the urban area?",
                "How well does the dominant legal system work?",
                "How well does the current system of governance function to maximize benefi ts for all?",
            ]
        }
        ];


CoS.Engagement =  [
        { name: 'Business Organizations', subdomains: ["Non-Profit & Social Enterprises", "Co-operatives & State-Run Enterprises", "Corporations & Large Enterprises", "Small & Medium Enterprises"] },

        { name: 'Civil Society', subdomains: ["Individuals & Communities", "Community-Based & Faith-Based Organizations", "Social Movements & Networks", "Non-Government Organizations & Foundations"] }, 
        
        { name: 'Research-Based Entities', subdomains: ["Individual Researchers & Research Groups", "Research Centres & Institutes", "Universities & Colleges", "Think Tanks & Research-Based Foundations"] }, 

        { name: 'Governance Institutions', subdomains: ["International & Global Governance Organizations", "States & Government Organizations", "Municipal & Provincial Governments", "Elders & Councils"] }
    ];

CoS.Knowledge =  [ 
    { name: 'Pragmatics', subdomains: ["Situated Knowing", "Tacit Knowing", "Intuitive Knowing", "Experiential Knowing"] }, 

    { name: 'Feeling', subdomains: ["Sensate Knowing", "Perceptive Knowing", "Emotional Knowing", "Revelatory Knowing"] }, 
    
    { name: 'Reflexivity', subdomains: ["Recursive Knowing", "Meta-Knowing", "Analytical Knowing II", "Theoretical Knowing II"] },

    { name: 'Reflection', subdomains: ["Theoretical Knowing I", "Analytical Knowing I", "Contemplative Knowing", "Trained Knowing"] }
    ];

CoS.Process = [
        { name: "COMMIT", subdomains: [], description: "COMMIT: Affirm, Establish, Choose, Resource", color: "#ED1C24" },
        { name: "ENGAGE", subdomains: [], description: "ENGAGE: Consult, Entrust, Empower, Accord", color: "#F26522" },
        { name: "ASSESS", subdomains: [], description: "ASSESS: Determine, Analyse, Research, Project", color: "#F7941E" },
        { name: "DEFINE", subdomains: [], description: "DEFINE: Clarify, Identify, Refine, Review", color: "#FFC20E" },
        { name: "IMPLEMENT", subdomains: [], description: "IMPLEMENT: Authorize, Enable, Liaise, Revise", color: "#FFF200" },
        { name: "MEASURE", subdomains: [], description: "MEASURE: Monitor, Document, Reassess, Evaluate", color: "#CBDB2A" },
        { name: "COMMUNICATE", subdomains: [], description: "COMMUNICATE: Translate, Publicize, Report, Advise", color: "#8DC63F" }
    ];
CoS.DefaultRatings = [
        { label: "Critical", color: "#ED1C24" },
        { label: "Bad", color: "#F26522" },
        { label: "Highly Unsatisfactory", color: "#F7941E" },
        { label: "Satisfactory-", color: "#FFC20E" },
        { label: "Satisfactory", color: "#FFF200" },
        { label: "Satisfactory+", color: "#CBDB2A" },
        { label: "Highly Satisfactory", color: "#8DC63F" },
        { label: "Good", color: "#39B44A" },
        { label: "Vibrant", color: "#00A651" }
    ];
    /*
// Consider:
//     darker vibrant green
//     Change Satisfactory- to Unsatisfactory
//     Change Satisfactory to Neither Satisfactory nor Unsatisfactory
//     Change Satisfactory+ to Satisfactory
    var ratings = config.ratings || [
        { label: "Critical", color: "#ED1C24" },
        { label: "Bad", color: "#F26522" },
        { label: "Highly Unsatisfactory", color: "#F7941E" },
        { label: "Unsatisfactory", color: "#FFC20E" },
        { label: "Neither Unsatisfactory nor Satisfactory", color: "#FFF200" },
        { label: "Satisfactory", color: "#CBDB2A" },
        { label: "Highly Satisfactory", color: "#8DC63F" },
        { label: "Good", color: "#39B44A" },
        { label: "Vibrant", color: "#009631" }
    ];
    */

CoS.Circle = function(ctx, config) {
    this.randomValues = function() {
      var values = new Array();
      for (var i = 0; i < this.domains.length; i++) {
          var domainValues = new Array();
          for (var j = 0; j < this.domains[i].subdomains.length; j++) {
            var extent = Math.ceil(Math.random() * numCircles);
            domainValues.push(extent);
          }
          values.push(domainValues);
      }
      return values;
    } 

    // Configurable variables
    this.domains = config.domains || CoS.Profile;
    var domainCount = this.domains.length;
    var subdomainCount = this.domains[0].subdomains.length;

    var height = config.height || 100;
    var width = config.width || 100;
    var useSameArea = config.useSameArea === false ? false : true;
    var drawText = config.drawText === false ? false : true;
    var radiusProportion = typeof(config.radiusProportion) !== 'undefined' ? config.radiusProportion : 0.9;
    var numCircles = config.numCircles || 9;
  
    var valuesRandomise = config.valuesRandomise || false;
    var values = config.values || (valuesRandomise ? this.randomValues() : []);

    var rotation = typeof(config.rotation) !== 'undefined' ? config.rotation : 0;
    var ratings = config.ratings || CoS.DefaultRatings;

    // Computed variables
    var x = Math.floor(width / 2), y = Math.floor(y = height / 2);
    var radius = Math.floor(x * radiusProportion);
    var maxArea = Math.pow(radius, 2) * Math.PI;
    var axisLength = config.axisLength || 1;

    // Setup context
    ctx.lineWidth = config.lineWidth || 1;
    ctx.font = config.font || "18px sans-serif";
    ctx.translate(x, y);
    ctx.rotate(rotation * Math.PI/180);
    ctx.translate(-x, -y);


    this.refreshValues = function(vals) {
        values = vals;
        this.drawCircle();
    }

    this.drawSegment = function(quadrant, sector, extent) {
        var colours = ratings.map(function(c) {return c.color;});
        var colour = colours[extent - 1];
        var quadFac = Math.PI;
        var dirFac = 1;

        var newRad = radius * extent / numCircles;
        if (useSameArea) {
            var newArea = maxArea * extent / numCircles;
            newRad = Math.pow(newArea / Math.PI, 1/2);
        }
        var startArcX = x + Math.sin(quadFac * sector  / subdomainCount) * dirFac * newRad;
        var startArcY = y + Math.cos(quadFac * sector  / subdomainCount) * dirFac * newRad;
        var endArcX = x + Math.sin(quadFac * (sector + 1) / subdomainCount) * dirFac * newRad;
        var endArcY = y + Math.cos(quadFac * (sector + 1)  / subdomainCount) * dirFac * newRad;
        var startAngle = Math.PI + Math.PI / (subdomainCount * 2) * (quadrant * subdomainCount + sector);
        var endAngle = startAngle + Math.PI / (subdomainCount * 2);


        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, radius, startAngle, endAngle, false);
        ctx.closePath();
        ctx.fillStyle = '#fff';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, newRad, startAngle, endAngle, false);
        ctx.closePath();
        ctx.fillStyle = colour;
        ctx.fill();

    }

    this.drawSegmentLines = function() {
        ctx.beginPath();
        var moduloFactor = this.domains.length;
        for (var i = 0; i < domainCount; i ++) {
            var quadFac = Math.PI;
            var dirFac = 1;
            switch(i) {
                case 0:
                    quadFac /= -2;
                    break;
                case 1:
                    quadFac /= -2;
                    dirFac = -1;
                    break;
                case 2:
                    quadFac /= 2;
                    dirFac = -1;
                    break;
                case 3:
                    quadFac /= 2;
                    break;
            }
            for (var j = 1; j < subdomainCount; j ++) {
                ctx.moveTo(x, y);
                ctx.lineTo(x + Math.sin(quadFac * j  / subdomainCount) * dirFac * radius, y + Math.cos(quadFac * j  / subdomainCount) * dirFac * radius);
            }
        }
        ctx.closePath();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "#444";
        ctx.stroke();
    }

    this.drawCircles = function() {
        ctx.beginPath();
        for (var i = numCircles; i > 0; i -= 1) {
            var newRad = radius * i / numCircles;
            if (useSameArea) {
                var newArea = maxArea * i / numCircles;
                newRad = Math.pow(newArea / Math.PI, 1/2);
            }
            ctx.moveTo(x + newRad, y);
            ctx.arc(x, y, newRad, 0, Math.PI * 2, false);
        }
        ctx.closePath();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "#444";
        ctx.stroke();

    }

    this.drawAxes = function() {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - radius * axisLength);
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + radius * axisLength);
        ctx.moveTo(x, y);
        ctx.lineTo(x - radius * axisLength, y);
        ctx.moveTo(x, y);
        ctx.lineTo(x + radius * axisLength, y);
        ctx.closePath();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "#444";
        ctx.stroke();
    }


    this.drawText = function() {
        var angle = 45;
        ctx.fillStyle = CoS.domainColour;
        for (var j = 0; j < this.domains.length; j++) {
            var domain = this.domains[j];
            var text = domain.name.toUpperCase();
            var len = text.length, s;
            var metrics = ctx.measureText(text);
            var w = metrics.width;
            var correction = (w / radius);
            var radiusCorrection = (correction * (Math.PI / 2)) / 2;
    
            ctx.save();
            ctx.translate(x, y);

            var correctedAngle = (j * Math.PI / 2) - ((Math.PI / 4)) - radiusCorrection;
            ctx.rotate(correctedAngle);
            for (i = 0; i < len; i++) {
                // i / len
              ctx.save();
              ctx.rotate((i / len) * correction * (Math.PI / 2));
              ctx.translate(0, -1 * radius * 1.05);
              s = text[i];
              ctx.fillText(s, 0, 0);
              ctx.restore();
            }
            ctx.restore();
        }
    }


    this.drawCircle = function() {
        // Draw segments lines
        ctx.clearRect(0, 0, width, height);
        for (var i = 0; i < values.length; i++) {
            var domainValues = values[i];
            for (var j = 0; j < domainValues.length; j++) {
                this.drawSegment(i, j, domainValues[j]);
            }
        }

        // Draw 28 - 4 segment lines
        this.drawSegmentLines();
        this.drawCircles();
        this.drawAxes();
        if (drawText)
            this.drawText();
    }

    this.updateCircleSegment = function(domainId, subdomainId, extent) {
        values[domainId][subdomainId] = extent;
        this.drawCircle();
        // this.drawSegment(domainId, subdomainId, extent);
        // this.drawSegmentLines();
        // this.drawCircles();
        // this.drawAxes();
    } 

    this.findSegment = function(eventX, eventY, callback) {
        var coordX = eventX - x;
        var coordY = eventY - y;
        var hypotenuse = Math.pow(Math.pow(coordX, 2) + Math.pow(coordY, 2), 0.5);
        if (hypotenuse < radius) {
            // Which quadrant?
            var quadrant = 0;
            if (coordX < 0 && coordY < 0) {
                quadrant = 0;
            }
            else if (coordY < 0) {
                quadrant = 1;
            }
            else if (coordX < 0) {
                quadrant = 3;
            }
            else  {
                quadrant = 2;
            }
            var angleInRadians = Math.atan(coordX / coordY);
            var angle = (angleInRadians * 2 / Math.PI) * 90;
            switch (quadrant) {
                case 0:
                    angle = 180 + (90 - angle);
                    break;
                case 1:
                    angle = 180 + (90 - angle);
                    break;
                case 2:
                    angle = (90 - angle);
                    break;
                case 3:
                    angle = (90 - angle);
                    break;
            }
            var currentDomain = this.domains[quadrant];
            var subdomainId = Math.floor((angle / 360) * (domainCount * subdomainCount)) % subdomainCount;
            var currentSubdomain = currentDomain.subdomains[subdomainId];
            oldValue = values[quadrant][subdomainId];
            var newValue = Math.floor((hypotenuse / radius) * numCircles) + 1;
            if (useSameArea) {
                var newArea = Math.pow(hypotenuse, 2) * Math.PI;
                newValue = Math.ceil(newArea / maxArea * numCircles);
            }
            callback(quadrant, currentDomain.name, subdomainId, currentSubdomain, oldValue, newValue);
        }
    }


    this.getRatingText = function(index) {
        return ratings[index].label;
    }

    this.getRatingColor = function(index) {
        return ratings[index].color;
    }
};

//CoS.Process = _.extend(CoS.Circle, 
CoS.ProcessCircle = function(ctx, config) {
    //CoS.Circle.call(this, ctx, config);

    // Configurable variables
    var height = config.height || 100;
    var width = config.width || 100;
    var useSameArea = config.useSameArea === false ? false : true;
    var drawText = config.drawText === false ? false : true;
    var radiusProportion = typeof(config.radiusProportion) !== 'undefined' ? config.radiusProportion : 0.9;
    var textRadiusProportion = typeof(config.textRadiusProportion) !== 'undefined' ? config.textRadiusProportion : 1.05;
    var numCircles = config.numCircles || 9;
    var values = config.values || [];
    var rotation = typeof(config.rotation) !== 'undefined' ? config.rotation : 0;
    var fontColor = config.fontColor || "#000000";
    var phases = config.phases || [
        { name: "COMMIT", description: "COMMIT: Affirm, Establish, Choose, Resource", color: "#ED1C24" },
        { name: "ENGAGE", description: "ENGAGE: Consult, Entrust, Empower, Accord", color: "#F26522" },
        { name: "ASSESS", description: "ASSESS: Determine, Analyse, Research, Project", color: "#F7941E" },
        { name: "DEFINE", description: "DEFINE: Clarify, Identify, Refine, Review", color: "#FFC20E" },
        { name: "IMPLEMENT", description: "IMPLEMENT: Authorize, Enable, Liaise, Revise", color: "#FFF200" },
        { name: "MEASURE", description: "MEASURE: Monitor, Document, Reassess, Evaluate", color: "#CBDB2A" },
        { name: "COMMUNICATE", description: "COMMUNICATE: Translate, Publicize, Report, Advise", color: "#8DC63F" }
    ];

    var ratings = config.ratings || CoS.DefaultRatings;

    // Computed variables
    var x = Math.floor(jQuery(ctx.canvas).width() / 2), y = Math.floor(jQuery(ctx.canvas).height() / 2);
    var radius = Math.floor(x * radiusProportion);
    var maxArea = Math.pow(radius, 2) * Math.PI;
    var axisLength = config.axisLength || 1;

    // Setup context
    ctx.lineWidth = config.lineWidth || 1;
    ctx.font = config.font || "18px sans-serif";
    ctx.translate(x, y);
    ctx.rotate(rotation * Math.PI/180);
    ctx.translate(-x, -y);


    this.drawSegment = function(sector, extent) {
        var colours = phases.map(function(c) {return c.color;});
        var colour = colours[sector];
        var quadFac = Math.PI;
        var dirFac = 1;

        var newRad = radius * (extent - 1) / numCircles;
        if (useSameArea) {
            var newArea = maxArea * (extent - 1) / numCircles;
            newRad = Math.pow(newArea / Math.PI, 1/2);
        }
        var sectorCount = 7 / 4;
        var quadFac = 0;
        var startAngle = Math.PI + Math.PI / (sectorCount * 2) * (quadFac * sectorCount + sector);
        var endAngle = startAngle + Math.PI / (sectorCount * 2);

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, radius, startAngle, endAngle, false);
        ctx.closePath();
        ctx.fillStyle = '#fff';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, radius, startAngle, endAngle, false);
        ctx.closePath();
        ctx.fillStyle = colour;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, newRad, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fillStyle = '#fff';
        ctx.fill();
    }

    this.drawSegmentArrows = function(sector, extent) {
        var colour = phases[phases.length - sector - 1].color;
        var quadFac = Math.PI;
        var dirFac = 1;

        var newRad = radius * (extent - 1) / numCircles;
        if (useSameArea) {
            var newArea = maxArea * (extent - 1) / numCircles;
            newRad = Math.pow(newArea / Math.PI, 1/2);
        }
        var sectorCount = 7 / 4;
        var quadFac = 0;
        var startAngle = Math.PI * -0.7845 + Math.PI / (sectorCount * 2) * (quadFac * sectorCount + sector);
        var endAngle = startAngle + Math.PI / (sectorCount * 2);
        var triangleEndAngle = endAngle;
        var meX = x + Math.sin(triangleEndAngle) * newRad; 
        var meY = y + Math.cos(triangleEndAngle) * newRad; 
        var feX = x + Math.sin(triangleEndAngle) * radius; 
        var feY = y + Math.cos(triangleEndAngle) * radius; 
        var aeX = x + Math.sin(triangleEndAngle - Math.PI / 25) * (newRad + (radius - newRad) / 2); 
        var aeY = y + Math.cos(triangleEndAngle - Math.PI / 25) * (newRad + (radius - newRad) / 2); 

        ctx.beginPath();
        ctx.moveTo(meX, meY);
        ctx.lineTo(feX, feY);
        ctx.lineTo(aeX, aeY);
        ctx.closePath();
        ctx.fillStyle = colour;
        ctx.fill();
    }

    this.drawSegmentLines = function() {
        ctx.beginPath();
        var counter = 0, j, quadFac, dirFac;
        for (var i = 0; i < 4; i ++) {
            quadFac = Math.PI;
            dirFac = 1;
            switch(i) {
                case 0:
                    quadFac /= -2;
                    break;
                case 1:
                    quadFac /= -2;
                    dirFac = -1;
                    break;
                case 2:
                    quadFac /= 2;
                    dirFac = -1;
                    break;
                case 3:
                    quadFac /= 2;
                    break;
            }
            for (j = 1; j < 7; j ++, counter++) {
                
                if (counter % 4 == 2 )
                {
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + Math.sin(quadFac * (j)  / 7) * dirFac * radius, y + Math.cos(quadFac * (j)  / 7) * dirFac * radius);
                }
            }
        }
        j = 7;
        quadFac = Math.PI / -2;
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.sin(quadFac * (j)  / 7) * dirFac * radius, y + Math.cos(quadFac * (j)  / 7) * dirFac * radius);
        ctx.closePath();
        ctx.strokeStyle = "#000";
        ctx.stroke();
    }

    this.drawCircles = function() {
        ctx.beginPath();
        for (var i = numCircles; i > 0; i -= 1) {
            var newRad = radius * i / numCircles;
            if (useSameArea) {
                var newArea = maxArea * i / numCircles;
                newRad = Math.pow(newArea / Math.PI, 1/2);
            }
            ctx.moveTo(x + newRad, y);
            ctx.arc(x, y, newRad, 0, Math.PI * 2, false);
        }
        ctx.closePath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "#444";
        ctx.stroke();
    }

    this.drawAxes = function() {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - radius * axisLength);
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + radius * axisLength);
        ctx.moveTo(x, y);
        ctx.lineTo(x - radius * axisLength, y);
        ctx.moveTo(x, y);
        ctx.lineTo(x + radius * axisLength, y);
        ctx.closePath();
        ctx.strokeStyle = "#000";
        ctx.stroke();
    }


    this.drawText = function() {
        // var angle = 45;
        ctx.fillStyle = fontColor;
        for (var j = 0; j < phases.length; j++) {
            var phase = phases[j];
            var text = phase.name.toUpperCase();
            var len = text.length, s;
            var metrics = ctx.measureText(text);
            var w = metrics.width;
            var correction = (w / radius);
            var wedgeAdjust = (7 / 2);
            var radiusCorrection = - (Math.PI / 3.85) + (correction * 0.88) ;
    
            ctx.save();
            ctx.translate(x, y);

            var correctedAngle = (j * Math.PI / wedgeAdjust)  - ((Math.PI / (wedgeAdjust / 2))) - radiusCorrection;
            ctx.rotate(correctedAngle);
            for (i = 0; i < len; i++) {
                // i / len
              ctx.save();
              s = text[i];
              var rotatePercent = (i / len);
              if (s == "I")
                rotatePercent += 0.03;
              ctx.rotate((rotatePercent) * correction * (Math.PI / 2));
              ctx.translate(0, -1 * radius * textRadiusProportion);
              ctx.fillText(s, 0, 0);
              ctx.restore();
            }
            ctx.restore();
        }
    }


    this.drawCircle = function() {
        // Draw segments lines
        ctx.clearRect(0, 0, width, height);
       for (var i = 0; i < phases.length; i++) {
            var phase = phases[i];
            this.drawSegment(i, numCircles);
        }

        // this.drawSegmentLines();
        this.drawCircles();
        // this.drawAxes();
        if (drawText)
            this.drawText();

       for (var i = 0; i < phases.length; i++) {
            var phase = phases[i];
            this.drawSegmentArrows(i, numCircles);
        }

    }

    this.updateCircleSegment = function(domainId, subdomainId, extent) {
        this.drawCircle();
    } 

    this.findSegment = function(eventX, eventY, callback) {
        var coordX = eventX - x;
        var coordY = eventY - y;
        var hypotenuse = Math.pow(Math.pow(coordX, 2) + Math.pow(coordY, 2), 0.5);
        if (hypotenuse < radius) {
            // Which quadrant?
            var quadrant = 0;
            if (coordX < 0 && coordY < 0) {
                quadrant = 0;
            }
            else if (coordY < 0) {
                quadrant = 1;
            }
            else if (coordX < 0) {
                quadrant = 3;
            }
            else  {
                quadrant = 2;
            }
            var angleInRadians = Math.atan(coordX / coordY);
            var angle = (angleInRadians * 2 / Math.PI) * 90;
            switch (quadrant) {
                case 0:
                    angle = (90 - angle);
                    break;
                case 1:
                    angle = (90 - angle);
                    break;
                case 2:
                    angle = 180 + (90 - angle);
                    break;
                case 3:
                    angle = 180 + (90 - angle);
                    break;
            }
            var phaseId = Math.floor((angle / 360) * (7)) % 7;
            var phaseName = phases[phaseId].description;
            callback(phaseName)
        }
    }


    this.getRatingText = function(index) {
        return ratings[index].label;
    }

    this.getRatingColor = function(index) {
        return ratings[index].color;
    }
};

//CoS.ProcessCircle.prototype = new CoS.Circle;