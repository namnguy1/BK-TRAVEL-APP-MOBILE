import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

const DetailTour = ({ item }) => {
    // Hàm chia đoạn văn thành các đoạn nhỏ dựa trên số câu
    const splitParagraphIntoSentences = (paragraph, sentencesPerBlock) => {
        const sentences = paragraph.split(/[.!?]/); // Tách đoạn thành câu
        const blocks = [];
        let currentBlock = '';

        sentences.forEach((sentence, index) => {
            currentBlock += sentence + (sentences[index + 1] ? '.' : ''); // Thêm dấu chấm sau mỗi câu
            if ((index + 1) % sentencesPerBlock === 0) { // Kiểm tra số câu trong mỗi đoạn
                blocks.push(currentBlock.trim());
                currentBlock = '';
            }
        });

        if (currentBlock) {
            blocks.push(currentBlock.trim()); // Thêm các câu còn lại vào block cuối cùng
        }

        return blocks;
    };

    // Đoạn văn và danh sách hình ảnh
    const { descriptionDetailTour, detailTourImage } = item;

    // Số câu cho mỗi đoạn
    const sentencesPerBlock = 2;

    // Chia đoạn văn thành các đoạn nhỏ
    const blocks = splitParagraphIntoSentences(descriptionDetailTour, sentencesPerBlock);

    return (
        <View style={styles.container} className= "px-5">
            {blocks.map((block, index) => (
                <View key={index}>
                    <Text style={styles.paragraph}>{block}</Text>
                    {index < detailTourImage.length && (
                        <Image source={detailTourImage[index]} style={styles.image} />
                    )}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
       
    },
    paragraph: {
        marginBottom: 10,
        fontWeight: '400',
    },
    image: {
        width: '100%',
        height: 200, // Thay đổi kích thước hình ảnh tùy ý
        resizeMode: 'cover',
        marginBottom: 10,
        borderRadius: 10,
    },
});

export default DetailTour;
