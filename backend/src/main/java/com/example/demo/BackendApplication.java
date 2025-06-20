package com.example.demo;

import com.example.demo.entity.Listing;
import com.example.demo.repository.ListingRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;
import java.util.Arrays;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(ListingRepository listingRepository) {
		return args -> {
			if (listingRepository.count() == 0) {
				listingRepository.saveAll(Arrays.asList(
					createListing("Cozy Downtown Apartment", "A nice place in the city center.", "New York, NY", new BigDecimal("120.00"), 2, 1, 4, "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", "WiFi,Kitchen"),
					createListing("Luxury Beach House", "A beautiful house by the beach.", "Miami, FL", new BigDecimal("250.00"), 3, 2, 6, "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80", "WiFi,Parking,Air Conditioning"),
					createListing("Mountain Cabin Retreat", "Escape to a cozy cabin in the mountains.", "Aspen, CO", new BigDecimal("180.00"), 2, 1, 4, "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80", "Kitchen,Parking"),
					createListing("Modern City Loft", "A stylish loft in the heart of the city.", "San Francisco, CA", new BigDecimal("200.00"), 1, 1, 2, "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80", "WiFi,Air Conditioning"),
					createListing("Historic Townhouse", "A charming townhouse with historical character.", "Boston, MA", new BigDecimal("160.00"), 3, 2, 5, "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", "WiFi,Kitchen,Parking"),
					createListing("Desert Oasis Villa", "A luxurious villa in the desert.", "Phoenix, AZ", new BigDecimal("300.00"), 4, 3, 8, "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80", "WiFi,Parking,Air Conditioning")
				));
				System.out.println("Database seeded with sample listings.");
			}
		};
	}

	private Listing createListing(String title, String description, String location, BigDecimal price, Integer bedrooms, Integer bathrooms, Integer maxGuests, String images, String amenities) {
		Listing listing = new Listing();
		listing.setTitle(title);
		listing.setDescription(description);
		listing.setLocation(location);
		listing.setPrice(price);
		listing.setBedrooms(bedrooms);
		listing.setBathrooms(bathrooms);
		listing.setMaxGuests(maxGuests);
		listing.setImages(images);
		listing.setAmenities(amenities);
		return listing;
	}
}
