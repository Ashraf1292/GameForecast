import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [message, setMessage] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsSnapshot = await firestore()
          .collection('ratings')
          .orderBy('createdAt', 'desc')
          .limit(3)
          .get();
  
        const fetchedReviews = reviewsSnapshot.docs.map(doc => doc.data());
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
  
    fetchReviews();
  }, []);
  

  const submitRating = async () => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        console.error('Error submitting rating: User not authenticated');
        return;
      }
  
      if (rating === 0) {
        console.error('Error submitting rating: Rating value is not set');
        return;
      }
  
      // Get the user's display name
      const displayName = currentUser.displayName || 'Anonymous';
  
      // Query to check if user already submitted a review
      const reviewQuerySnapshot = await firestore()
        .collection('ratings')
        .where('userId', '==', currentUser.uid)
        .get();
  
      // Get the first document if exists
      const reviewDoc = reviewQuerySnapshot.docs[0];
  
      if (reviewDoc) {
        // Update the existing review document
        await firestore()
          .collection('ratings')
          .doc(reviewDoc.id)
          .update({
            rating: rating,
            reviewComment: reviewComment,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
  
        // Update the state with the updated review
        setReviews(prevReviews => {
          const updatedReviews = prevReviews.map(review => {
            if (review.userId === currentUser.uid) {
              return {
                ...review,
                rating: rating,
                reviewComment: reviewComment,
                createdAt: new Date().toISOString(),
              };
            }
            return review;
          });
          return updatedReviews;
        });
      } else {
        // Store new review document in Firestore
        const newReviewRef = await firestore().collection('ratings').add({
          userId: currentUser.uid,
          email: currentUser.email,
          displayName: displayName, // Include the user's display name in the review
          rating: rating,
          reviewComment: reviewComment,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
  
        // Update the state with the new review
        setReviews(prevReviews => [
          {
            userId: currentUser.uid,
            email: currentUser.email,
            displayName: displayName,
            rating: rating,
            reviewComment: reviewComment,
            id: newReviewRef.id,
            createdAt: new Date().toISOString(),
          },
          ...prevReviews,
        ]);
      }
  
      // Display success message
      setMessage('Rating submitted successfully');
  
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
  
      // Clear rating and review comment
      setRating(0);
      setReviewComment('');
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Rate our App</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((value) => (
          <Button
            key={value}
            title={value.toString()}
            onPress={() => setRating(value)}
            color={value <= rating ? '#f9ca24' : '#dcdde1'}
          />
        ))}
      </View>
      <TextInput
        placeholder="Add your review comment..."
        value={reviewComment}
        onChangeText={setReviewComment}
        style={styles.input}
      />
      <Button title="Submit Rating" onPress={submitRating} disabled={rating === 0} style={styles.submitButton}/>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.reviewsTitle}>Latest Reviews:</Text>
      <FlatList
  data={reviews}
  renderItem={({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewContent}>
        <Text style={styles.displayName}>{item.displayName}</Text>
        <Text style={styles.reviewComment}>{item.reviewComment}</Text>
        <Text style={styles.rating}>Rating: {item.rating}</Text>
      </View>
    </View>
  )}
  keyExtractor={(item, index) => index.toString()}
/>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  submitButton: {
    marginBottom: 16,
  },
  message: {
    color: '#2ecc71',
    fontSize: 16,
    marginBottom: 16,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reviewItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  reviewItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  reviewContent: {
    flex: 1,
    marginLeft: 10,
  },
  displayName: {
    fontWeight: 'bold',
    marginBottom: 5,
    color:'#000',
    fontSize: 16,
  },
  reviewComment: {
    marginBottom: 5,
  },
  rating: {
    fontWeight: 'bold',
  },
  
});

export default Rating;
