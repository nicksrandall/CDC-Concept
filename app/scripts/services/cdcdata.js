'use strict';

/**
 * @ngdoc service
 * @name cdcApp.cdcData
 * @description
 * # cdcData
 * Factory in the cdcApp.
 */
angular.module('cdcApp')
  .factory('cdcData', function () {
    var main = {};
    main.numberOfPersons = {
      name: 'Number of Persons',
      description: 'Diabetes is becoming more common in the United States. From 1980 through 2011, the number of Americans with diagnosed diabetes has more than tripled (from 5.6 million to 20.9 million).',
      color: ['#D9EBFD'],
      type: 'single',
      data: 'data/numberOfPersons.json',
    };
    main.numberOfAdults = {
      name: 'Number of Adults',
      description: 'From 1980 through 2011, the number of U.S. adults aged 18 years or older with diagnosed diabetes has more than tripled (from 5.5 million to 19.6 million).',
      color: ['#90c4e4'],
      type: 'single',
      data: 'data/numberOfAdults.json',
    };
    main.crudeAndAge = {
      name: 'Crude and Age-Adjusted Percentage',
      description: 'From 1980 through 2011, the crude prevalence of diagnosed diabetes increased 176% (from 2.5% to 6.9%). During this period, increases in the crude and age-adjusted prevalence of diagnosed diabetes were similar, indicating that most of the increase in prevalence was not because of changes in the population age structure.',
      color: ['#73B0D7', '#A0D771'],
      type: 'line',
      data: 'data/crudeAndAge.json',
    };
    main.crudeAndAgeAdults = {
      name: 'Crude and Age-Adjusted Percentage of Adults',
      description: 'From 1980 through 2011, the crude prevalence of diagnosed diabetes among U.S. adults aged 18 years or older increased by 157% (from 3.5% to 9.0%). During this period, increases in the crude and age-adjusted prevalence of diagnosed diabetes were similar, indicating that most of the increase in prevalence was not because of changes in the population age structure.',
      color: ['#73B0D7', '#A0D771'],
      type: 'line',
      data: 'data/crudeAndAgeAdults.json',
    };
    main.rateByAge = {
      name: 'Percentage by Age',
      color: ['#73B0D7', '#A0D771', '#E45621', '#FBAD56'],
      description: 'From 1980 through 2011, the rate of diagnosed diabetes increased 167% (from 0.6% to 1.6%) for people aged 0–44 years, 118% (from 5.5% to 12.0%) for those aged 45–64 years, 140% (9.1% to 21.8%) for those aged 65–74 years, and 125% (8.9% to 20.0%) for those aged 75 years and older. In general, throughout the time period, the rate of diagnosed diabetes increased among people of all age groups. In 2011, the rate of diagnosed diabetes among people aged 65–74 (21.8%) was more than 13 times that of people younger than 45 years of age (1.6%).',
      type: 'line',
      data: 'data/rateByAge.json'
    };
    main.rateByEducation = {
      name: 'Percentage by Education',
      color: ['#73B0D7', '#A0D771', '#E45621'],
      description: 'From 1980 through 2011, the age-adjusted rate of diagnosed diabetes increased by 153% (from 3.4% to 8.6%) for people with less than a high school education, 213% (from 2.4% to 7.5%) for those with a high school education, and 168% (from 2.2% to 5.9%) for those with more than a high school education. In general, throughout the period, the age-adjusted rate was highest among people with less than a high school education compared with those with a higher level of education.',
      type: 'line',
      data: 'data/rateByEducation.json'
    };
    main.rateBySex = {
      name: 'Percentage by Sex',
      description: '',
      color: ['#73B0D7', '#73B0D7'],
      type: 'line',
      data: 'data/rateBySex.json'
    };
    main.rateByRace = {
      name: 'Percentage by Race',
      color: ['#73B0D7', '#A0D771', '#E45621'],
      description: 'From 1980 to 1998, the age-adjusted rate of diagnosed diabetes was similar for men and women. However, in 1999, the rate for males began to increase at a faster rate than that of females. From 1980 to 2011, the age-adjusted rate of diagnosed diabetes increased 156% (from 2.7% to 6.9%) for males and 103% (from 2.9% to 5.9%) for females.',
      type: 'line',
      data: 'data/rateByRace.json'
    };
    main.rateByRaceAndSex = {
      name: 'Percentage by Race and Sex',
      color: ['#73B0D7', '#A0D771', '#E45621', '#FBAD56'],
      description: 'The data show that blacks are disproportionately affected by diabetes. From 1980 through 2011, the age-adjusted prevalence of diagnosed diabetes increased among all sex-race groups examined. From 1980 through 2011, the age-adjusted prevalence of diagnosed diabetes was higher among blacks than whites, and highest in general among black females. During this time period, the age-adjusted prevalence increased 160% (from 2.5% to 6.5%) among white males, 108% (from 2.6% to 5.4%) among white females, 148% (from 4.0% to 9.9%) among black males, and 84% (from 4.9% to 9.0%) among black females. Among Asians, from 1997 through 2011, the age-adjusted prevalence increased 81% (from 4.3% to 7.8%) among males and 49% (from 3.7% to 5.5%) among females.',
      type: 'line',
      data: 'data/rateByRaceAndSex.json'
    };
    main.rateByAgeAndRaceAndSex = {
      name: 'Percentage by Race and Age and Sex',
      color: ['#73B0D7', '#A0D771', '#E45621', '#FBAD56'],
      description: 'The data show that blacks are disproportionately affected by diabetes. From 1980 through 2011, the age-adjusted prevalence of diagnosed diabetes increased among all sex-race groups examined. From 1980 through 2011, the age-adjusted prevalence of diagnosed diabetes was higher among blacks than whites, and highest in general among black females. During this time period, the age-adjusted prevalence increased 160% (from 2.5% to 6.5%) among white males, 108% (from 2.6% to 5.4%) among white females, 148% (from 4.0% to 9.9%) among black males, and 84% (from 4.9% to 9.0%) among black females. Among Asians, from 1997 through 2011, the age-adjusted prevalence increased 81% (from 4.3% to 7.8%) among males and 49% (from 3.7% to 5.5%) among females.',
      type: 'bar',
      data: 'data/rateByAgeAndRaceAndSex.json'
    };
    main.rateByHispanicOrigin = {
      name: 'Percentage by Hispanic Origin',
      color: ['#73B0D7', '#A0D771', '#E45621', '#FBAD56'],
      description: 'Among US Hispanics overall, the age-adjusted rate of diagnosed diabetes increased by 46% from 6.3% in 1997 to 9.2% in 2011. During the period, compared with the other Hispanic groups, persons of Cuban descent had the lowest age-adjusted prevalence of diagnosed diabetes but experienced the largest (66%) increase in prevalence. In 2011, among US Hispanics, the age-adjusted prevalence of diagnosed diabetes was 7.3% for Cubans, 10.0% for Mexicans/Mexican Americans, and 10.1 % for Puerto Ricans.',
      type: 'line',
      data: 'data/rateByHispanicOrigin.json'
    };
    main.rateByOriginAndSex = {
      name: 'Percentage by Hispanic Origin and Sex',
      color: ['#73B0D7', '#73B0D7', '#80C25D', '#80C25D', '#FB8D34', '#FB8D34'],
      description: 'From 1997 to 2011, the age-adjusted rate of diagnosed diabetes was lower among Cuban males and females and highest among Puerto Rican males compared with other Hispanic population groups. During the time period, the age-adjusted rate of diagnosed diabetes increased 10% (from 9.6% to 10.6%) among Puerto Rican males, 33% (from 7.3% to 9.7%) among Puerto Rican females, 46% (from 6.3% to 9.2%) among Mexican/Mexican American males, 65% (from 6.5% to 10.7%) among Mexican/Mexican American females, 118% (from 3.8% to 8.3%) among Cuban males, and 32% (from 4.7% to 6.2%) among Cuban females.',
      type: 'line',
      data: 'data/rateByOriginAndSex.json'
    };
    var _current = main.numberOfPersons;
    main.getter = function () {
      return _current;
    };
    main.setter = function (obj) {
      _current = obj;
    };
    return main;
  });
