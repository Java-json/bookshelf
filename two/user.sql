/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50709
Source Host           : localhost:3306
Source Database       : p_mtc

Target Server Type    : MYSQL
Target Server Version : 50709
File Encoding         : 65001

Date: 2017-01-04 13:41:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_img` varchar(60) DEFAULT NULL,
  `user_cn_name` varchar(4) DEFAULT NULL,
  `user_age` smallint(4) DEFAULT NULL,
  `user_idcard` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idinx` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('41', 'upload_dab5c542711b6184bca104c1d63bde26.jpg', '避风港', '33', '3333');
INSERT INTO `user` VALUES ('42', 'upload_3ee4064ae351e91e60fe5656adf66033.jpg', '带饭不', '45', '555');
INSERT INTO `user` VALUES ('43', 'upload_57db26a21ee40cf471049717f354c40d.jpg', '多场', '33', '2223');
INSERT INTO `user` VALUES ('44', 'upload_3cf4b31510aec845b19943f76c7320d4.jpg', '发红包', '44', '33333');
INSERT INTO `user` VALUES ('45', 'upload_2a8fe2d462959b5b98577ee46fb6c4da.jpg', '你够花', '55', '555');
